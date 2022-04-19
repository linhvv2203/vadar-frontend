import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { NotificationService } from "src/app/services/notifications";
import { CancelInvitation, GetMembersByWorkspace } from "src/app/redux/members";
import { CommonService } from "src/app/services/common/common.service";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-popup-cancel-invite",
  templateUrl: "./popup-cancel-invite.component.html",
  styleUrls: ["./popup-cancel-invite.component.less"]
})
export class PopupCancelInviteComponent implements OnInit {
  memberSelected: any;
  oldRolesId = "";
  @Input()
  isVisibleCancel: boolean;

  @Output()
  isVisibleCancelChange = new EventEmitter();

  @Input()
  invitation: any;

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });
  }

  handleOk(): void {
    this.close();
  }

  handleCancel(): void {
    this.close();
  }

  close(): void {
    this.isVisibleCancel = false;
    this.isVisibleCancelChange.emit(this.isVisibleCancel);
  }

  cancelInvitation(id: string) {
    this._store.dispatch(
      new CancelInvitation({ invitationId: id }, res => {
        if (res) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.getMembersByWorkspace();
        }
      })
    );

    this.close();
  }

  getMembersByWorkspace() {
    this._store.dispatch(
      new GetMembersByWorkspace(
        {
          workspaceId: Number(this.workspaceId)
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
