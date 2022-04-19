import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { EActionTypes as ELoaderActionTypes } from "src/app/redux/loader/actions";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { Observable } from "rxjs";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { ExpireStatus } from "src/app/enums/enums";

@Component({
  templateUrl: "./choose-workspace.component.html",
  styleUrls: ["./choose-workspace.component.less"]
})
export class ChooseWorkspaceComponent implements OnInit {
  ExpireStatus = ExpireStatus;
  workspaceSelected$: Observable<any>;
  auth$: Observable<object>;

  constructor(
    private _store: Store<any>,
    public _commonService: CommonService
  ) {
    this._store.dispatch({ type: ELoaderActionTypes.STOP_LOADING });
  }

  ngOnInit() {
    this.auth$ = this._store.pipe(select(selectAuth));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      // --- Role & Permission
      res &&
        this.auth$.subscribe((data: any) => {
          if (
            data &&
            data.systemPermissions &&
            (this._commonService.isSupperAdmin(data.systemPermissions) ||
              res.status !== ExpireStatus.Revoked)
          ) {
            this._commonService.handleRoute(data);
          }
        });

      // --- end Role & Permssion
    });
  }
}
