import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { EnPermissions, ExpireStatus } from "src/app/enums/enums";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { select as selectAuth } from "src/app/redux/auth";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  workspaceSelected$: Observable<object>;
  statusAuth: number;
  auth$: Observable<object>;
  auth: any = {};
  params: any = {};

  constructor(
    private _translateService: TranslateService,
    private _store: Store<any>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe((auth: any) => {
      if (auth) this.statusAuth = auth.status;
    });
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe(value => {
      if (value) this.auth = value;
    });
    this._route.queryParams.subscribe((params: Params) => {
      this.params = params;
    });
  }

  public toArray(enumme) {
    const ar = [];
    Object.keys(enumme).forEach(key => {
      ar.push(key);
    });
    return ar;
  }

  public isDayDateFormat(time = []): string {
    if (!time[1] || !time[0]) return "MM/dd/yyyy HH:mm:ss";
    return time[1] - time[0] > 86400000 ? "MM/dd/yyyy" : "MM/dd/yyyy HH:mm:ss";
  }

  /**
   *
   * @param days Days you want to subtract
   */
  public getDayAgo(days = 1) {
    let date = new Date();
    let last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    return last;
  }

  public checkFirstClickHost(auth) {
    const { userClaims } = auth;
    let isFirstClickHost = false;
    if (userClaims.length) {
      const FirstClickHost = userClaims.find(x => x.claimId === 1);
      if (FirstClickHost) {
        isFirstClickHost = JSON.parse(FirstClickHost.value);
      }
    }
    return !!isFirstClickHost;
  }

  public getGrafanaInventory(wp, name): string {
    return (
      environment.grafana.baseUrl +
      wp.grafanaInventoryDashboardUrl +
      "?orgId=" +
      wp.grafanaOrgId +
      "&kiosk=tv" +
      "&var-Agent_Name=" +
      name
    );
  }

  public getGrafanaPerformance(wp, name): string {
    return (
      environment.grafana.baseUrl +
      wp.grafanaPerformanceDashboardUrl +
      "?orgId=" +
      wp.grafanaOrgId +
      "&kiosk=tv" +
      "&var-Agent_Name=" +
      name
    );
  }

  public settingParamsForAddUser(
    login: string,
    name: string,
    organisation: string,
    profile: string = "analyst"
  ): any {
    return {
      method: "POST",
      index: "v1/user",
      useCookie: true,
      query: {
        login,
        name,
        organisation,
        profile
      }
    };
  }

  public getGrafanaSecurity(wp, name): string {
    return (
      environment.grafana.baseUrl +
      wp.grafanaSecurityDashboardUrl +
      "?orgId=" +
      wp.grafanaOrgId +
      "&kiosk=tv" +
      "&var-Agent_Name=" +
      name
    );
  }

  public decodeBase64(char): object {
    let c = decodeURIComponent(char);
    return JSON.parse(atob(c)) || {};
  }

  public findObjById(arr, id): any {
    return arr.find(x => x.id === id);
  }

  public findIndexObjById(arr, url): any {
    return arr.findIndex(x => x.url === url);
  }

  public findObjByName(arr, name): any {
    return arr.find(x => x.name === name);
  }

  public findObj(arr, name, value): any {
    return arr.findIndex(x => x[name] === value);
  }

  public spliceArrByName(arr: any[], name): any[] {
    if (!arr) {
      return [];
    }
    return arr.filter(x => x.name === name);
  }

  public validateEmail(email: string): boolean {
    const EMAIL_REGEXP = /^[_a-zA-Z0-9-.+]+(\.[_a-zA-Z0-9-.+]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]*)$/;
    return EMAIL_REGEXP.test(String(email).toLowerCase());
  }

  public validateIp(email: string): boolean {
    const IP_REGEXP = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return IP_REGEXP.test(String(email).toLowerCase());
  }

  public validateUrl(url: string): boolean {
    const IP_REGEXP = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
    return IP_REGEXP.test(String(url).toLowerCase());
  }

  public validatePhoneNumber(phone: string): boolean {
    const IP_REGEXP = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})/;
    return IP_REGEXP.test(String(phone).toLowerCase());
  }

  public translateText(content: string, callback?: Function): string {
    let result = "";
    this._translateService.get(content).subscribe((res: string) => {
      result = res;
      callback && callback(result);
    });
    return result;
  }

  public isSupperAdmin(systemPermissionsList = []) {
    return systemPermissionsList.indexOf(EnPermissions.FullPermission) >= 0
      ? true
      : false;
  }

  public validatePermission(permissionIds, systemPermissionsList) {
    if (
      !this.isSupperAdmin(this.auth.systemPermissions) &&
      this.statusAuth === ExpireStatus.Revoked
    ) {
      return false;
    }
    if (permissionIds && systemPermissionsList) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < systemPermissionsList.length; i++) {
        if (permissionIds.indexOf(systemPermissionsList[i]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  public mailTo() {
    window.open("mailto:support@vsec.com.vn", "emailWindow");
    if (window && window.open && !window.closed) window.close();
  }

  public getStatusName(status: number) {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Accept";
      case 2:
        return "Reject";
      case 3:
        return "Cancel";
      default:
        return "";
    }
  }

  public handleRoute(data) {
    if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.DashboardView,
          EnPermissions.AllDashboardsView
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/dashboard"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.AllLogsView,
          EnPermissions.LogsView
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/performance"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.AllEventsView,
          EnPermissions.EventsView
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/events"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.WorkspacePermissionView,
          EnPermissions.WorkspacePermissionSetting
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/roles"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.GroupSetting,
          EnPermissions.GroupView,
          EnPermissions.AllGroupsSetting,
          EnPermissions.AllGroupsView
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/group"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.HostSetting,
          EnPermissions.HostView,
          EnPermissions.AllHostsSetting,
          EnPermissions.AllHostsView
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/host"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.EmailNotificationView,
          EnPermissions.AllNotificationView,
          EnPermissions.EmailNotificationSetting
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/notifications"], {
        queryParams: { ...this.params }
      });
    } else if (
      this.validatePermission(
        [
          EnPermissions.FullPermission,
          EnPermissions.PolicyView,
          EnPermissions.PolicySetting,
          EnPermissions.WhitelistIpView,
          EnPermissions.WhitelistIpSetting
        ],
        data.systemPermissions
      )
    ) {
      this._router.navigate(["/actions"], {
        queryParams: { ...this.params }
      });
    }
  }
}
