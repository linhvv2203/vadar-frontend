import { Component, OnInit } from "@angular/core";
import { select as selectAuth } from "src/app/redux/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { Store, select } from "@ngrx/store";
import { CommonService } from "src/app/services/common/common.service";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-performance",
  templateUrl: "./performance.component.html",
  styleUrls: ["./performance.component.less"]
})
export class PerformanceComponent implements OnInit {
  filterPer: object = {};
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router
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
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });
  }
}
