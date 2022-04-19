import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { IAppState } from "src/app/redux/app.state";
import { LogoutAllServices } from "src/app/redux/auth";
import { AuthStorage } from "src/app/services/auth/auth-storage.service";

@Component({
  selector: "vadar-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.less"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _authStorage: AuthStorage,
    private _store: Store<IAppState>
  ) {
    this._store.dispatch(
      new LogoutAllServices(() => {
        this._oidcSecurityService.logoff();
        this._authStorage.deleteAll();
      })
    );
  }

  ngOnInit() {}
}
