import { GetPolicies, Update } from "src/app/redux/action/actions";
import { Component, OnInit } from "@angular/core";
import { selectPolicies } from "src/app/redux/action";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { Router } from "@angular/router";
import { select as selectAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-action-table",
  templateUrl: "./action-table.component.html",
  styleUrls: ["./action-table.component.less"]
})
export class ActionTableComponent implements OnInit {
  EnPermissions = EnPermissions;
  model$: Observable<object>;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    private _noticeSer: NotificationService,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.model$ = this._store.pipe(select(selectPolicies));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.PolicyView,
              EnPermissions.PolicySetting
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
        }
      }
    });
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this._store.dispatch(new GetPolicies({ workspaceId: res.id }));
        this.workspaceId = res.id;
      }
    });
  }

  handleChangeEnable(e: any, isEnable: boolean): void {
    const policyIds = [];
    e.forEach(element => {
      if (isEnable) {
        policyIds.push(element.id);
      }
    });
    this._store.dispatch(
      new Update({ policyIds, workspaceId: this.workspaceId }, res => {
        this._noticeSer.success(
          this._commonService.translateText("WORKSPACES.SUCCESS")
        );
      })
    );
  }
}
