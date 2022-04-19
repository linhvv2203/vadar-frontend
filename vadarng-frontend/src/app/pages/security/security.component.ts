import { Component, OnInit } from "@angular/core";
import { select as selectAuth } from "src/app/redux/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { Store, select } from "@ngrx/store";
import { CommonService } from "src/app/services/common/common.service";
import { EnPermissions } from "src/app/enums/enums";
import { selectAll, selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { NotificationService } from "src/app/services/notifications";

@Component({
  selector: "vadar-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.less"]
})
export class SecurityComponent implements OnInit {
  filterSe: any = {
    sort: "desc"
  };
  tabIndex: number = 0;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaces$: Observable<any>;
  time: object = [new Date(new Date().getTime() - 24 * 60 * 60000), new Date()];

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _noticeSer: NotificationService
  ) {}

  ngOnInit() {
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.LogsView,
              EnPermissions.AllLogsView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
        }
      }
    });
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaces$ = this._store.select(selectAll);

    this.workspaces$.subscribe(res => {
      if (res) {
        this._route.queryParams.subscribe(params => {
          this.tabIndex = Number(params.tabIndex) || 0;
          if (!params.wp_id) return;
          const wp = this._commonService.findObjById(res, Number(params.wp_id));
          if (!wp) {
            this._noticeSer.warning(
              this._commonService.translateText("SECURITY.HAVE_NOTHING")
            );
          }
        });
      }
    });
  }

  onChangeTab(e) {
    this.tabIndex = e;
  }
}
