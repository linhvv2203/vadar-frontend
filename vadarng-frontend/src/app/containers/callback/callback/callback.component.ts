import { Component, OnInit } from "@angular/core";
import {
  OidcSecurityService,
  AuthorizationResult,
  AuthorizationState
} from "angular-auth-oidc-client";
import { Router } from "@angular/router";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";

@Component({
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.less"]
})
export class CallbackComponent implements OnInit {
  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _authStorage: AuthStorage,
    private _router: Router
  ) {
    if (this._oidcSecurityService.moduleSetup) {
      this._onOidcModuleSetup();
    } else {
      this._oidcSecurityService.onModuleSetup.subscribe(() => {
        this._onOidcModuleSetup();
      });
    }

    this._oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this._onAuthorizationResultComplete(authorizationResult);
      }
    );
  }

  ngOnInit() {}

  private _onOidcModuleSetup() {
    if (window.location.search.length > 0) {
      this._oidcSecurityService.authorizedCallbackWithCode(
        window.location.toString()
      );
    } else {
      if ("/callback" !== window.location.pathname) {
        this._authStorage.redirectUrl = {
          redirect: window.location.pathname,
          redirectParams: window.location.search.replace("?", "")
        };
      }
      this._oidcSecurityService
        .getIsAuthorized()
        .subscribe((authorized: boolean) => {
          if (!authorized) {
            this._oidcSecurityService.authorize();
            // this.router.navigate(['/callback']);
          } else {
            this._router.navigate(["/"]);
          }
        });
    }
  }

  private _onAuthorizationResultComplete(
    authorizationResult: AuthorizationResult
  ) {
    if (window.location.href.indexOf("callback") < 0) {
      return;
    }

    let path = (this._authStorage.redirectUrl || {}).redirect;

    if (
      authorizationResult.authorizationState === AuthorizationState.authorized
    ) {
      this._authStorage.value = this._oidcSecurityService.getToken();

      if (path) {
        let queryParams = this._authStorage.redirectUrl.redirectParams;
        if (queryParams && queryParams.length > 0) {
          queryParams = queryParams.replace(/&/g, '","');
          queryParams = queryParams.replace(/=/g, '":"');
          queryParams = `{"${queryParams}"}`;
          try {
            queryParams = JSON.parse(queryParams);
          } catch (error) {
            console.warn(error);
            this._router.navigate([path]);
          }

          this._router.navigate([path], {
            queryParams
          });
        } else {
          this._router.navigate([path]);
        }
      } else {
        this._router.navigate(["/"]);
      }
    } else {
      this._authStorage.remove();
      this._router.navigate(["/"]);
    }
  }
}
