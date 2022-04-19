import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectAll } from "src/app/redux/workspaceRoles";
import {
  CreateInviteForWorkspace,
  GetMembersByWorkspace
} from "src/app/redux/members";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { selectSetting } from "src/app/redux/setting";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-popup-invite-members",
  templateUrl: "./popup-invite-members.component.html",
  styleUrls: ["./popup-invite-members.component.less"]
})
export class PopupInviteMembersComponent implements OnInit {
  validateForm: FormGroup;
  @Input()
  isVisiblePopupInvite: boolean;

  @Output()
  isVisiblePopupInviteChange = new EventEmitter();
  model$: Observable<any>;
  model: any;

  workspaceSelected$: Observable<any>;
  workspaceId = null;
  constructor(
    private fb: FormBuilder,
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      this.workspaceId = res.id;
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      emails: [null, [Validators.required]],
      workspaceRoles: [null, [Validators.required]]
    });

    this.model$ = this._store.select(selectAll);
  }

  handleOk(): void {
    this.close();
  }

  handleCancel(): void {
    this.close();
  }

  close(): void {
    this.isVisiblePopupInvite = false;
    this.isVisiblePopupInviteChange.emit(this.isVisiblePopupInvite);
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = { ...this.validateForm.value };
    dataSend.workspaceRoles = [
      this.validateForm.controls["workspaceRoles"].value
    ];

    this._store.pipe(select(selectSetting)).subscribe(data => {
      dataSend.language = data.lang;
    });

    dataSend.workspaceId = this.workspaceId;
    this._store.dispatch(
      new CreateInviteForWorkspace(dataSend, res => {
        if (res && res.emails && res.emails.length > 0) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );

          this._store.dispatch(
            new GetMembersByWorkspace({
              workspaceId: Number(this.workspaceId)
            })
          );
        }
      })
    );

    this.close();
  }
}
