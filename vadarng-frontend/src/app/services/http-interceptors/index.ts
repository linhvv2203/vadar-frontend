import { environment } from "src/environments/environment";
import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { OidcSecurityService } from "angular-auth-oidc-client";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";
import { NotificationService } from "../notifications";
import { LocalStorageService } from "../local-storage";

const localStorageInstance = new LocalStorageService();
/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  private _oidcSecurityService: OidcSecurityService;

  constructor(
    private _injector: Injector,
    private _router: Router,
    private _authStorage: AuthStorage,
    private _notificationsService: NotificationService,
    private _httpClient: HttpClient
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestToForward = request;

    if (!this._oidcSecurityService) {
      this._oidcSecurityService = this._injector.get(OidcSecurityService);
    }
    let lang = localStorageInstance.getItem(
      environment.localStorage.settingsKey
    );

    lang = lang ? (lang.lang === "vn" ? "vi" : "en") : "vi";

    if (this._oidcSecurityService) {
      let token = this._oidcSecurityService.getToken();
      if (token !== "") {
        const tokenValue = "Bearer " + token;
        requestToForward = request.clone({
          setHeaders: {
            Authorization: tokenValue,
            "X-localization": lang
          }
        });
      } else {
        token = this._authStorage.token;
        const tokenValue = "Bearer " + token;
        requestToForward = request.clone({
          setHeaders: {
            Authorization: tokenValue,
            "X-localization": lang
          }
        });
      }
    } else {
      const token = this._authStorage.token;
      const tokenValue = "Bearer " + token;
      requestToForward = request.clone({
        setHeaders: {
          Authorization: tokenValue,
          "X-localization": lang
        }
      });
    }

    return next.handle(requestToForward).pipe(
      // tslint:disable-next-line: deprecation
      tap(null, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (this._oidcSecurityService) {
              const headers = new HttpHeaders().set(
                "Content-Type",
                "application/json"
              );
              const payload = this._oidcSecurityService.getPayloadFromIdToken();
              this._httpClient
                .get<any>(
                  environment.identity.baseUrl +
                    "/account/logoutalldevicestime?userId=" +
                    payload.sub,
                  { headers: headers }
                )
                .subscribe(
                  res => {
                    if (Number(payload.auth_time) <= Number(res)) {
                      this._oidcSecurityService.logoff();
                    } else {
                      this._authStorage.deleteAll();

                      if (window.location.href.indexOf("callback") < 0) {
                        this._authStorage.redirectUrl = {
                          redirect: window.location.pathname,
                          redirectParams: window.location.search.replace(
                            "?",
                            ""
                          )
                        };
                      }

                      this._oidcSecurityService.authorize();
                    }
                  },
                  error => {
                    this._authStorage.deleteAll();

                    if (window.location.href.indexOf("callback") < 0) {
                      this._authStorage.redirectUrl = {
                        redirect: window.location.pathname,
                        redirectParams: window.location.search.replace("?", "")
                      };
                    }

                    this._oidcSecurityService.authorize();
                  }
                );
            } else {
              this._authStorage.deleteAll();

              if (window.location.href.indexOf("callback") < 0) {
                this._authStorage.redirectUrl = {
                  redirect: window.location.pathname,
                  redirectParams: window.location.search.replace("?", "")
                };
              }

              this._oidcSecurityService.authorize();
            }
            // this._router.navigate(['/unauthorized']);
          } else {
            if (err.status === 403) {
              this._router.navigate(["/forbidden"]);
            } else {
              if (err.status === 429) {
                this._notificationsService.error(
                  "Too many requests. Please access again in a few minutes."
                );
              }
            }
          }
        }
      })
    );
  }
}
