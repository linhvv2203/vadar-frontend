import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { RouterStateSerializer } from "@ngrx/router-store";

import {
  AuthModule,
  OidcSecurityService,
  OidcConfigService
} from "angular-auth-oidc-client";

import { AuthGuardService } from "src/app/services/auth/auth-guard.service";

import { ConfigAuthOidcService } from "src/app/services/auth/auth-oidc-client.service";
import { AuthFlowService } from "src/app/services/auth/auth-flow.service";
import { AppHttpInterceptor } from "./http-interceptors";
import { LocalStorageService } from "./local-storage";
import { TitleService } from "./title";
import { AppErrorHandler } from "./error-handler";
import { CustomSerializer } from "./router-serializer";
import { NotificationService } from "./notifications";
import { AuthStorage } from "./auth/auth-storage.service";
import { PreviousRouteService } from "src/app/services/previous-route";
import { AppGlobalStateService } from "./global";
import { CommonService } from "./common/common.service";

const loadConfig = (configAuthOidcService: ConfigAuthOidcService) => {
  return () => configAuthOidcService.loadConfig();
};

@NgModule({
  imports: [HttpClientModule, AuthModule.forRoot({ storage: AuthStorage })],
  declarations: [],
  providers: [
    AuthGuardService,
    AuthFlowService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [ConfigAuthOidcService]
    },
    AppGlobalStateService,
    LocalStorageService,
    TitleService,
    NotificationService,
    PreviousRouteService,
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: []
})
export class ServicesModule {
  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _configAuthOidcService: ConfigAuthOidcService
  ) {
    this._configAuthOidcService.onConfigurationLoaded.subscribe(() =>
      this._configAuthOidcService.setupSSO(this._oidcSecurityService)
    );
  }
}
