import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { map, timeout } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { IPayload } from "src/app/redux/middleware/models";
import { BBException, HttpStatus } from "src/app/enums/enums";
import { NotificationService } from "src/app/services/notifications";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

const getHttpOptions = (headers?) => {
  if (!headers) {
    headers = {
      "Content-Type": "application/json"
      // 'Authorization': 'my-auth-token',
    };
  }

  return {
    headers: new HttpHeaders(headers)
  };
};

const timeOut = 30000;

@Injectable({
  providedIn: "root"
})
export class MiddleService {
  httpStatus = HttpStatus;
  constructor(
    private _http: HttpClient,
    private _notificationsService: NotificationService,
    private _translateService: TranslateService,
    private _router: Router
  ) {}

  callApi(payload?: IPayload): Observable<object> {
    const { url, params, method, headers, data, apiVersion } = payload;
    let apiUrl = `${environment.appApi.baseUrl}${url}`;

    if (apiVersion === "v2" || apiVersion === "outDoor") {
      apiUrl = `${url}`;
    }

    if (!environment.production && false) {
      // tslint:disable-next-line:no-console
      console.info("====> Call " + apiUrl, ", options=", params || data);
    }

    const httpOptions = getHttpOptions(headers);

    if (params) {
      apiUrl +=
        "?" +
        Object.keys(params || {})
          .map(
            k =>
              `${encodeURIComponent(k)}=${encodeURIComponent(params[k] || "")}`
          )
          .join("&");
    }

    if (method === "POST") {
      return this._http
        .post<any>(apiUrl, data, httpOptions)
        .pipe(timeout(timeOut))
        .pipe(
          map((res: any) => {
            if (res.status !== this.httpStatus.Success) {
              if (Number(res.messageCode) === BBException.Forbidden) {
                this._router.navigate(["/forbidden"]);
                return;
              }

              this._translateService
                .get(this.getResponseMessage(res.messageCode))
                .subscribe((result: string) => {
                  this._notificationsService.error(result);
                });
              return;
            }
            return res.data ? res.data : res.messageCode;
          })
        );
    } else if (method === "PUT") {
      return this._http
        .put<any>(apiUrl, data, httpOptions)
        .pipe(timeout(timeOut))
        .pipe(
          map((res: any) => {
            if (res.status !== this.httpStatus.Success) {
              this._translateService
                .get(this.getResponseMessage(res.messageCode))
                .subscribe((result: string) => {
                  this._notificationsService.error(result);
                });
              return;
            }
            return res.data ? res.data : res.messageCode;
          })
        );
    } else if (method === "DELETE") {
      return this._http
        .delete<any>(apiUrl, httpOptions)
        .pipe(timeout(timeOut))
        .pipe(
          map((res: any) => {
            if (res.status !== this.httpStatus.Success) {
              this._translateService
                .get(this.getResponseMessage(res.messageCode))
                .subscribe((result: string) => {
                  this._notificationsService.error(result);
                });
              return;
            }
            return res.data ? res.data : res.messageCode;
          })
        );
    }

    return this._http
      .get(apiUrl, httpOptions)
      .pipe(timeout(timeOut))
      .pipe(
        map((res: any) => {
          if (res.query) return res;
          else if (res.code === "00") return;
          if (res.status !== this.httpStatus.Success) {
            if (Number(res.messageCode) === BBException.Forbidden) {
              this._router.navigate(["/forbidden"]);
              return;
            }

            if (res.status !== 1) {
              this._translateService
                .get(this.getResponseMessage(res.messageCode))
                .subscribe((result: string) => {
                  this._notificationsService.error(result);
                });
              return;
            }
          }
          return res.data ? res.data : res.messageCode;
        })
      );
  }

  getResponseMessage(errorCode): string {
    switch (errorCode) {
      case BBException.ArgumentInvalid:
        return "Argument is invalid";
      case BBException.ArgumentLessThanOrEqualZero:
        return "Argument is less than or equal zero.";
      case BBException.ArgumentLessThanZero:
        return "Argument is less than zero.";
      case BBException.ArgumentNull:
        return "ACTION.ARGUMENT_IS_NULL";
      case BBException.ArgumentNullOrEmpty:
        return "Argument is null or empty.";
      case BBException.ArgumentNullOrWhiteSpace:
        return "Argument is null or white space.";
      case BBException.ArgumentOutOfRange:
        return "Argument is our of range.";
      case BBException.Forbidden:
        return "Forbidden.";
      case BBException.InternalException:
        return "Internal Exception.";
      case BBException.PermissionInvalid:
        return "Do not have permission.";
      case BBException.UnAuthorized:
        return "UnAuthorized.";
      case BBException.UserNotFound:
        return "User Not Found.";
      case BBException.UserRestricted:
        return "User Restricted";
      case BBException.RoleNameExists:
        return "Role Name Exists";
      case BBException.RoleAlreadyHasUser:
        return "Role Already Has User";
      case BBException.PermissionIsRequired:
        return "Permission Is Required";
      case BBException.WorkspaceExists:
        return "WORKSPACES.THE_WORKSPACE_HAS_ALREADY_EXISTS";
      case BBException.WorkspaceNull:
        return "Workspace Null";
      case BBException.GroupExists:
        return "GROUP.GROUP_NAME_ALREADY_EXISTS";
      case BBException.GroupNull:
        return "Group Null";
      case BBException.WorkspaceRoleExists:
        return "WORKSPACES.WORKSPACE_ROLE_EXISTS";
      case BBException.WorkspaceNull:
        return "Workspace Role Null";
      case BBException.HostExist:
        return "Host Exists";
      case BBException.HostNull:
        return "Host Null";
      case BBException.InvalidInvitationId:
        return "Invalid Invitation Id";
      case BBException.GroupHostExists:
        return "Group Host Exists";
      case BBException.EngineNotWork:
        return "ACTION.ENGINE_NOT_WORK";
      case BBException.WhiteIpExists:
        return "ACTION.WHITE_IP_EXISTS";
      case BBException.PleaseDeleteGroup:
        return "WORKSPACES.DELETE_GROUP_BEFORE_DELETE_WORKSPACE";
      case BBException.PleaseDeleteHost:
        return "WORKSPACES.PLEASE_DELETE_HOST_BEFORE_DELETE_WORKSPACE";
      case BBException.EmailExistInvite:
        return "ACTION.LIST_EMAIL_INVALID";
      case BBException.EmailInvalid:
        return "ACTION.EMAIL_INVALID_LIST";
      case BBException.RolePermissionNull:
        return "MEMBERS.NOT_HAVE_PERMISSION";
      case BBException.WorkspaceRoleHaveMember:
        return "MEMBERS.WORKSPACE_ROLE_HAVE_MEMBER";
      case BBException.ExpiredTimeInvalid:
        return "WORKSPACES.EXPIREDTIMEINVALID";
      case BBException.HostLimitIsTooLarge:
        return "LICENSES.HOSTLIMITISTOOLARGE";
      case BBException.CannotActive:
        return "WORKSPACES.EXPIREDTIMEINVALID";
      case BBException.NotInvite:
        return "MEMBERS.NOT_INVITE";
      case BBException.InvitationInvalid:
        return "MEMBERS.INVITATION_INVALID";
      case BBException.EmailNotCreatedOnIDserver:
        return "MEMBERS.EMAIL_NOT_CREATED_IDSERVER";
      case BBException.ConditionIsNotSatisfied:
        return "NOTIFICATIONS.LEVEL_VALIDATE";
      case BBException.TeleTokenInValid:
        return "NOTIFICATIONS.TELE_TOKEN_INVALID";
      default:
        return "SERVER_RESPONSE.UNKNOW_EXCEPTION";
    }
  }
}
