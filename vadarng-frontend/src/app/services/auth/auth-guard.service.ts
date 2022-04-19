import { Injectable, Output, EventEmitter } from "@angular/core";
import { Router, CanActivate, CanLoad } from "@angular/router";

import { OidcSecurityService } from "angular-auth-oidc-client";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { select as selectAuth } from "src/app/redux/auth";

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  @Output() getUserBaseInfoInGuard: EventEmitter<any> = new EventEmitter();

  constructor(
    private _router: Router,
    private _authStorage: AuthStorage,
    private _oidcSecurityService: OidcSecurityService,
    private _store: Store<IAppState>
  ) {}

  canActivate(): boolean {
    return this._checkUser();
  }

  canLoad(): boolean {
    return this._checkUser();
  }

  private _checkUser(): boolean {
    if (this._authStorage.isAuthorized) {
      this._store.pipe(select(selectAuth)).subscribe(auth => {
        if (auth && auth.permissionIds && auth.permissionIds.length <= 0) {
          this._router.navigate(["/forbidden"]);
        }
      });
      return true;
    }

    if (
      "/callback" !== window.location.pathname &&
      "/" !== window.location.pathname &&
      window.location.href.indexOf("callback") < 0
    ) {
      this._authStorage.redirectUrl = {
        redirect: window.location.pathname,
        redirectParams: window.location.search.replace("?", "")
      };
    }

    this._oidcSecurityService.authorize();
    return false;
  }
}
