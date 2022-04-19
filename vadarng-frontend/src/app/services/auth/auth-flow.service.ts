import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";

import { IAppState } from "src/app/redux/app.state";

import {
  GetProfileAuth,
  select as selectAuth,
  IState as IAuthState
} from "src/app/redux/auth";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Injectable()
export class AuthFlowService {
  private _auth$: IAuthState;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _router: Router,
    private _authStorage: AuthStorage,
    private _store: Store<IAppState>
  ) {
    this._store
      .pipe(select(selectAuth))
      .subscribe(auth => (this._auth$ = auth));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });
  }

  private _redirectUrl(redirect?: string): void {
    if (redirect !== "/callback" && redirect !== "/callback-client") {
      this._store.pipe(select(selectAuth)).subscribe(auth => {
        if (
          "/choice-role" !== window.location.pathname &&
          auth &&
          auth.roleId === 0
        ) {
          if (
            this._authStorage.redirectUrl !== undefined &&
            this._authStorage.redirectUrl !== null &&
            this._authStorage.redirectUrl.redirect !== undefined &&
            this._authStorage.redirectUrl.redirect !== null &&
            this._authStorage.redirectUrl.redirect.indexOf("choice-role") >= 0
          ) {
            var queryParams = this._authStorage.redirectUrl.redirectParams;
            if (
              queryParams !== undefined &&
              queryParams !== null &&
              queryParams.length > 0
            ) {
              queryParams = '{"' + queryParams.replace("=", '":"') + '"}';
            }

            this._router.navigate(["/choice-role"], {
              queryParams:
                queryParams !== null &&
                queryParams !== undefined &&
                queryParams !== ""
                  ? JSON.parse(queryParams)
                  : undefined
            });
          } else {
            // this._router.navigate(["/choice-role"]);
            // this._router.navigate(["/"]);
          }

          return;
        }
      });
    }
  }

  checkAuthFlow(redirect?: string): void {
    if (this._authStorage.isAuthorized) {
      if (this._auth$) {
        this._redirectUrl(redirect);
        return;
      }

      this._store.dispatch(
        new GetProfileAuth({ workspaceId: this.workspaceId }, user => {
          this._redirectUrl(redirect);
        })
      );
    }
  }
}
