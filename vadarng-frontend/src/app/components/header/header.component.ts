import { LogoutAllServices, GetProfileAuth } from "./../../redux/auth/actions";
import { Component, OnInit } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";

import { AuthStorage } from "src/app/services/auth/auth-storage.service";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { IAppState } from "src/app/redux/app.state";
import { select as selectAuth } from "src/app/redux/auth";
import { ChangeShowLeftMenu } from "src/app/redux/left-menu";
import { EnPermissions, ExpireStatus } from "src/app/enums/enums";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/local-storage";
import {
  selectAll,
  GetAllWorkspaceByUserId,
  selectedWorkspacesHeader,
  SetSelectedWorkspacesHeader,
  GetDetail
} from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import {
  ChangeFirstActive,
  selectFirstActive
} from "src/app/redux/first-active";
import { environment } from "src/environments/environment";
const localStorageInstance = new LocalStorageService();

@Component({
  selector: "vadar-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class HeaderComponent implements OnInit {
  EnPermissions = EnPermissions;
  ExpireStatus = ExpireStatus;
  isAuthorized: boolean;
  auth$: Observable<any>;
  isFirstClickHost$: Observable<boolean>;
  workspaces$: Observable<any>;
  workspaceSelected$: Observable<any>;
  workspaceSelected: any = {};
  isExpired: boolean = false;
  showMenu = false;
  isLogout: boolean = false;
  params: Params;
  ex: string = environment.ex;
  expiredCount = 0;

  constructor(
    private _oidcSecurityService: OidcSecurityService,
    private _authStorage: AuthStorage,
    private _store: Store<IAppState>,
    private _commonService: CommonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getWorkspaces();
    this.isFirstClickHost$ = this._store.pipe(select(selectFirstActive));
    this.isAuthorized = this._authStorage.isAuthorized;
    this.workspaces$ = this._store.select(selectAll);
    this.workspaces$.subscribe(res => {
      if (res && res.length) {
        this._route.queryParams.subscribe((params: Params) => {
          this.params = params;
          const wp_local_store = localStorageInstance.getItem(
            "WORKSPACES_SELECTED"
          );
          let wp = null;
          if (params.wp_id) {
            wp = this._commonService.findObjById(res, Number(params.wp_id));
          } else if (wp_local_store) {
            wp = this._commonService.findObjById(
              res,
              Number(wp_local_store.id)
            );
          } else {
            wp = res[0];
          }
          wp && this.workspaceSelected.id !== wp.id && this.changeWorkspace(wp);
        });
      } else if (res) {
        this._store.dispatch(new GetProfileAuth());
      }
    });
    this.auth$ = this._store.pipe(select(selectAuth));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.workspaceSelected = res;
      this.expiredCount = Math.round(
        (new Date(this.workspaceSelected.endDate).getTime() -
          new Date().getTime()) /
          (24 * 60 * 60 * 1000)
      );

      this.auth$.subscribe(auth => {
        if (!auth.id) return;
        if (
          !this._commonService.validatePermission(
            [EnPermissions.FullPermission],
            auth.systemPermissions
          ) &&
          this.workspaceSelected &&
          this.workspaceSelected.id
        ) {
          this.isExpired = false; // reset
          if (this.workspaceSelected.status === ExpireStatus.Revoked) {
            // thu hồi license
            return;
          } else if (
            this.workspaceSelected.status === ExpireStatus.ExpiredDate ||
            new Date(this.workspaceSelected.endDate) <= new Date()
          ) {
            // hết hạn license
            setTimeout(() => {
              this.isExpired = true;
            }, 300);
            return;
          } else {
            const url: any = this._route.snapshot;
            if (
              url._routerState.url.indexOf("/members/invitation-confirm") ===
                -1 &&
              url._routerState.url.indexOf("/host") === -1 &&
              this._commonService.validatePermission(
                [
                  EnPermissions.FullPermission,
                  EnPermissions.HostSetting,
                  EnPermissions.HostView,
                  EnPermissions.AllHostsSetting,
                  EnPermissions.AllHostsView
                ],
                auth.systemPermissions
              )
            )
              this._store.dispatch(
                new ChangeFirstActive(
                  this._commonService.checkFirstClickHost(auth)
                )
              );
          }
        }
      });
    });
  }

  getWorkspaces() {
    this._store.dispatch(new GetAllWorkspaceByUserId());
  }

  changeWorkspace(value: any): void {
    value &&
      this._store.dispatch(
        new GetDetail({ workspaceId: value.id }, data => {})
      );
    this._store.dispatch(new GetProfileAuth({ workspaceId: value.id }));
    this._store.dispatch(new SetSelectedWorkspacesHeader(value));
  }

  handleChangeWorkspace(value: any) {
    const params = { ...this.params };
    delete params.params;
    this._router.navigate([window.location.pathname], {
      queryParams: { ...params, wp_id: value.id }
    });
  }

  logout() {
    this.isLogout = true;
    this._store.dispatch(
      new LogoutAllServices(() => {
        this._oidcSecurityService.logoff();
        this._authStorage.deleteAll();
      })
    );
  }

  handleToggleMenu() {
    this.showMenu = !this.showMenu;
    this._store.dispatch(new ChangeShowLeftMenu(this.showMenu));
  }
}
