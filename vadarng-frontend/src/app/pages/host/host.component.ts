import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { CommonService } from "src/app/services/common/common.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";
import { select as selectAuth, UpdateProfileAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { ChangeFirstActive } from "src/app/redux/first-active";

@Component({
  selector: "vadar-host",
  templateUrl: "./host.component.html",
  styleUrls: ["./host.component.less"]
})
export class HostComponent implements OnInit {
  EnPermissions = EnPermissions;
  isCreate: boolean = true;
  isFirstClickHost: boolean = true;
  filter: any;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params: Params) => {
      this.isCreate = params.isCreate;
    });
  }

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.HostView,
              EnPermissions.HostSetting,
              EnPermissions.AllHostsView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
          return;
        }
        this.changeGuidePopup(data);
      }
    });
    // --- end Role & Permssion
  }

  changeGuidePopup(auth) {
    this.isFirstClickHost = this._commonService.checkFirstClickHost(auth);
    if (!this.isFirstClickHost) {
      let userClaims = [
        {
          value: true,
          type: "boolean",
          isPublic: true,
          claimId: 1
        }
      ];
      userClaims = userClaims;
      this._store.dispatch(
        new UpdateProfileAuth(
          {
            userClaims,
            id: auth.id,
            email: auth.email,
            userName: auth.userName
          },
          () => {
            this._store.dispatch(new ChangeFirstActive(true));
          }
        )
      );
    }
  }
}
