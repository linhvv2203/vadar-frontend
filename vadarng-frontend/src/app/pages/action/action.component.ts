import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { CommonService } from "src/app/services/common/common.service";
import { Router } from "@angular/router";
import { select as selectAuth } from "src/app/redux/auth";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { EnPermissions } from "src/app/enums/enums";

@Component({
  selector: "vadar-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.less"]
})
export class ActionComponent implements OnInit {
  EnPermissions = EnPermissions;
  isCreate: boolean = false;
  tabIndex: number = 0;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.PolicyView,
              EnPermissions.PolicySetting,
              EnPermissions.WhitelistIpView,
              EnPermissions.WhitelistIpSetting
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
          return;
        }
      }
    });
    // --- end Role & Permssion
  }

  onChangeTab(e) {
    this.tabIndex = e;
  }
}
