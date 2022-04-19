import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { EnPermissions } from "src/app/enums/enums";

@Component({
  selector: "vadar-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.less"]
})
export class TicketComponent implements OnInit {
  filterTicket: object = {};
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
