import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  AcceptRejectInvitation,
  IAcceptRejectInvitation,
  VerifyInvitation
} from "src/app/redux/members";
import { ActivatedRoute, Params } from "@angular/router";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { LocalStorageService } from "src/app/services/local-storage";
// import { Observable } from "rxjs";
import { LogoutAllServices } from "src/app/redux/auth";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { AuthStorage } from "src/app/services/auth/auth-storage.service";
import { Organisation } from "src/app/redux/workspaces";

const localStorageInstance = new LocalStorageService();

@Component({
  selector: "vadar-invitation-confirm",
  templateUrl: "./invitation-confirm.component.html",
  styleUrls: ["./invitation-confirm.component.less"]
})
export class InvitationConfirmComponent implements OnInit {
  acceptRejectInvitation: IAcceptRejectInvitation;
  verifyInvitation = 0;
  query: Params;
  // auth$: Observable<any>;
  // auth: any = null;
  isVisible: boolean;
  inviteTo: string = "";

  constructor(
    private _store: Store<any>,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    public _commonService: CommonService,
    private _oidcSecurityService: OidcSecurityService,
    private _authStorage: AuthStorage
  ) {
    this.isVisible = false;
  }

  ngOnInit() {
    // this.auth$ = this._store.pipe(select(selectAuth));
    // this.auth$.subscribe(auth => {
    //   this.auth = auth;
    // });

    this._store.dispatch(
      new VerifyInvitation(
        { invitationId: this._route.snapshot.params.inviteCode },
        res => {
          if (res) {
            this.inviteTo = res;
            this.verifyInvitation = 1;
          } else {
            this.verifyInvitation = 2;
          }
        }
      )
    );
  }

  showConfirm(): void {
    this.isVisible = true;
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.invitationConfirm(2);
  }

  invitationConfirm(status: number) {
    this._store.dispatch(
      new AcceptRejectInvitation(
        {
          status: status,
          invitationId: this._route.snapshot.params.inviteCode
        },
        res => {
          if (res) {
            if (status == 1) {
              this._notificationService.success(
                this._commonService.translateText(
                  "INVITATION.You_have_been_added_to_the"
                ) +
                  this._route.snapshot.params.name +
                  " workspace."
              );
              localStorageInstance.setItem("WORKSPACES_SELECTED", null);
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
              // this.handleAddUserIntoTheHive(this._route.snapshot.params);
              // this._store.dispatch(new GetAllWorkspaceByUserId());
              // this._store.dispatch(
              //   new ChangeFirstActive(
              //     this._commonService.checkFirstClickHost(this.auth)
              //   )
              // );
            }

            if (status == 2) {
              this._notificationService.error(
                this._commonService.translateText(
                  "INVITATION.You_have_been_reject_to_the"
                ) +
                  this._route.snapshot.params.name +
                  " workspace."
              );

              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }
          } else {
            this._notificationService.error(
              this._commonService.translateText(
                "INVITATION.Something_went_wrong"
              )
            );
          }
        }
      )
    );
  }

  handleAddUserIntoTheHive(data: any): void {
    if (data.isCreatedOrganisation) return;
    this._store.dispatch(
      new Organisation(
        {
          method: "POST",
          index: "login",
          useCookie: true,
          query: {}
        },
        (res: any) => {
          if (!res.isSuccessStatusCode) return;
          // create organisation
          this._store.dispatch(
            new Organisation(
              ...this._commonService.settingParamsForAddUser(
                this.inviteTo,
                this.inviteTo,
                data.name
              ),
              ress => {
                window.location.href = "/";
              }
            )
          );
        }
      )
    );
  }

  logout() {
    this._store.dispatch(
      new LogoutAllServices(() => {
        this._oidcSecurityService.logoff();
        this._authStorage.deleteAll();
      })
    );
  }
}
