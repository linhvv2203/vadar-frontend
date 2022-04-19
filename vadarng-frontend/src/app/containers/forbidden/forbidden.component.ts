import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { EActionTypes as ELoaderActionTypes } from "src/app/redux/loader/actions";
import { Router } from "@angular/router";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { Observable } from "rxjs";
import { ExpireStatus } from "src/app/enums/enums";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
@Component({
  templateUrl: "./forbidden.component.html",
  styleUrls: ["./forbidden.component.less"]
})
export class ForbiddenComponent implements OnInit {
  workspaceSelected$: Observable<any>;
  auth$: Observable<object>;

  constructor(
    private _store: Store<any>,
    private _router: Router,
    public _commonService: CommonService
  ) {
    this._store.dispatch({ type: ELoaderActionTypes.STOP_LOADING });
  }

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.auth$ = this._store.pipe(select(selectAuth));
    this.workspaceSelected$.subscribe(res => {
      if (res)
        this.auth$.subscribe((data: any) => {
          if (
            data &&
            data.systemPermissions &&
            (this._commonService.isSupperAdmin(data.systemPermissions) ||
              res.status !== ExpireStatus.Revoked)
          ) {
            this._commonService.handleRoute(data);
          } else this._router.navigate(["/choose-workspace"]);
        });
      else this._router.navigate(["/choose-workspace"]);
    });
  }
}
