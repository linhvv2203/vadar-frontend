import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  selectMembersByWorkspace,
  GetMembersByWorkspace,
  DeleteInvitation,
  UpdateWorkspaceRoleForUser,
  IWorkspaceRoleUserUpdateRequest
} from "src/app/redux/members";
import { CommonService } from "src/app/services/common/common.service";
import {
  GetAllWorkspaceRolesByWorkspaceId,
  selectAll
} from "src/app/redux/workspaceRoles";
import { NotificationService } from "src/app/services/notifications";
import {
  EnInviteWorkspaceRoleStatus,
  EnPermissions
} from "src/app/enums/enums";
import { Router } from "@angular/router";
import { select as selectAuth } from "src/app/redux/auth";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.less"]
})
export class MembersComponent implements OnInit {
  EnPermissions = EnPermissions;
  enInviteWorkspaceRoleStatus = EnInviteWorkspaceRoleStatus;

  validateForm: FormGroup;
  isCreate = false;
  memberSelected: any;
  isVisibleResend = false;
  isVisibleCancel = false;
  currentWorkspaceId = 0;
  oldRolesId = "";

  workspaceRoles$: Observable<object>;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private _store: Store<any>,
    private _notificationService: NotificationService,
    private _router: Router,
    public _commonService: CommonService
  ) {}

  onOpenFormCreate(): void {
    this.isCreate = true;
  }

  ngOnInit() {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.WorkspacePermissionView,
              EnPermissions.WorkspacePermissionSetting
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
          return;
        }
      }
    });
    // --- end Role & Permssion

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.currentWorkspaceId = Number(res.id);
        this.initDataByWorkspaceId();
      }
    });
  }

  initDataByWorkspaceId() {
    this.validateForm = this.fb.group({
      workspaceRoles: [null, [Validators.required]]
    });

    if (
      !this.currentWorkspaceId ||
      Number(this.currentWorkspaceId) <= 0 ||
      isNaN(Number(this.currentWorkspaceId))
    ) {
      return;
    }

    this._store.dispatch(
      new GetAllWorkspaceRolesByWorkspaceId({
        workspaceId: Number(this.currentWorkspaceId)
      })
    );
    this.workspaceRoles$ = this._store.select(selectAll);
    this._store.dispatch(
      new GetMembersByWorkspace(
        {
          workspaceId: Number(this.currentWorkspaceId)
        },
        res => {
          if (res && res.length > 0) {
            this.memberSelected = res[0];
            this.oldRolesId = res[0].workspaceRoleId;
          } else {
            this.memberSelected = null;
          }
        }
      )
    );

    this._store.pipe(select(selectMembersByWorkspace)).subscribe(res => {
      if (res && res.length > 0) {
        this.memberSelected = res[0];
        this.oldRolesId = res[0].workspaceRoleId;
      } else {
        this.memberSelected = null;
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  deleteInvitation(id: string) {
    this._store.dispatch(
      new DeleteInvitation(
        { invitationId: id, workspaceId: this.currentWorkspaceId },
        res => {
          if (res) {
            this._notificationService.success(
              this._commonService.translateText("WORKSPACES.SUCCESS")
            );
            this.getMembersByWorkspace();
          }
        }
      )
    );
  }

  handleUpdateRoleForUser() {
    const dataSend: IWorkspaceRoleUserUpdateRequest = {
      email: this.memberSelected.userEmail,
      workspaceRoles: [this.validateForm.controls["workspaceRoles"].value]
    };
    if (this.oldRolesId === dataSend.workspaceRoles[0]) return;
    this.oldRolesId = dataSend.workspaceRoles[0];
    this._store.dispatch(
      new UpdateWorkspaceRoleForUser(dataSend, res => {
        if (res) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
        // else {
        //   this._notificationService.error(
        //     this._commonService.translateText("GLOBAL.ERROR")
        //   );
        // }
      })
    );
  }

  onOpenFormCreateShow() {
    this._router.navigate(["/roles"], {
      queryParams: {
        show: "createPopup"
      }
    });
  }
  getMembersByWorkspace() {
    this._store.dispatch(
      new GetMembersByWorkspace(
        {
          workspaceId: Number(this.currentWorkspaceId)
        },
        res => {
          if (res && res.length > 0) {
            this.memberSelected = res[0];
            this.oldRolesId = res[0].workspaceRoleId;
          } else {
            this.memberSelected = null;
          }
        }
      )
    );
  }
}
