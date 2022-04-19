import { Injectable, EventEmitter, Output } from "@angular/core";
import {
  OidcSecurityService,
  OpenIdConfiguration,
  AuthWellKnownEndpoints
} from "angular-auth-oidc-client";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ConfigAuthOidcService {
  config: any;
  wellKnownEndpoints: any;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onConfigurationLoaded: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor() {}

  async loadConfig() {
    if ("/bank/viviet-return" == window.location.pathname) {
      return;
    }

    try {
      this.config = {
        Name: "core",
        DefaultAPIAddress: environment.identity.baseUrl,
        SSOAddress: environment.identity.baseUrl,
        SSOClientId: "vadar",
        AllowedMaxExportSize: "2000"
      };
      await this.loadSSOConfig(this.config.SSOAddress);
    } catch (err) {
      console.error(
        `ConfigAuthOidcService 'loadConfig' threw an error on config SSO`,
        err
      );
      this.onConfigurationLoaded.emit(false);
    }
  }

  async loadSSOConfig(stsServer: string) {
    try {
      const response = await fetch(
        `${stsServer}/.well-known/openid-configuration`
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      this.wellKnownEndpoints = await response.json();
      this.onConfigurationLoaded.emit(true);
    } catch (err) {
      console.error(
        `ConfigAuthOidcService 'loadSSOConfig' threw an error on calling ${stsServer}`,
        err
      );
      this.onConfigurationLoaded.emit(false);
    }
  }

  async setupSSO(oidcSecurityService: OidcSecurityService) {
    const c: OpenIdConfiguration = {
      stsServer: this.config.SSOAddress,
      redirect_url: window.location.origin + "/callback",
      client_id: this.config.SSOClientId,
      response_type: "code",
      scope: environment.identity.scope,
      post_logout_redirect_uri: window.location.origin,
      forbidden_route: "/forbidden",
      unauthorized_route: "/unauthorized",
      log_console_warning_active: false,
      log_console_debug_active: false,
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specifi
      max_id_token_iat_offset_allowed_in_seconds: 30 * 24 * 60 * 60,
      isauthorizedrace_timeout_in_seconds: 15,
      start_checksession: false,
      silent_renew: false,
      silent_renew_url: window.location.origin + "/callback-silent",
      silent_renew_offset_in_seconds: 1000,
      auto_userinfo: true,
      auto_clean_state_after_authentication: true,
      trigger_authorization_result_event: true
    };

    const wn: AuthWellKnownEndpoints = {
      issuer: this.wellKnownEndpoints.issuer,
      jwks_uri: this.wellKnownEndpoints.jwks_uri,
      authorization_endpoint: this.wellKnownEndpoints.authorization_endpoint,
      token_endpoint: this.wellKnownEndpoints.token_endpoint,
      userinfo_endpoint: this.wellKnownEndpoints.userinfo_endpoint,
      end_session_endpoint: this.wellKnownEndpoints.end_session_endpoint,
      check_session_iframe: this.wellKnownEndpoints.check_session_iframe,
      revocation_endpoint: this.wellKnownEndpoints.revocation_endpoint,
      introspection_endpoint: this.wellKnownEndpoints.introspection_endpoint
    };

    oidcSecurityService.setupModule(c, wn);

    return oidcSecurityService;
  }
}
