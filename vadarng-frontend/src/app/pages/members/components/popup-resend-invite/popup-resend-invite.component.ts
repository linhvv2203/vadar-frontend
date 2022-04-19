import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { Store, select } from "@ngrx/store";
import { NotificationService } from "src/app/services/notifications";
import { ResendInvitation } from "src/app/redux/members";
import { CommonService } from "src/app/services/common/common.service";
import { selectSetting } from "src/app/redux/setting";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-popup-resend-invite",
  templateUrl: "./popup-resend-invite.component.html",
  styleUrls: ["./popup-resend-invite.component.less"]
})
export class PopupResendInviteComponent implements OnInit {
  validateForm: FormGroup;

  @Input()
  isVisibleResend: boolean;

  @Output()
  isVisibleResendChange = new EventEmitter();

  @Input()
  invitation: any;
  urlInvitation = `${window.location.origin}/members/invitation-confirm/`;

  workspaceSelected$: Observable<any>;

  constructor(
    private _fb: FormBuilder,
    private _message: NzMessageService,
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateForm = this._fb.group({
      url: [`${window.location.origin}/members/invitation-confirm/`]
    });
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
  }

  copyLinkResend(): void {
    const copyText: any = document.querySelector("#metaTagLinkResend");
    copyText.select();
    document.execCommand("copy");
    this._message.create(
      "success",
      this._commonService.translateText("GLOBAL.COPIED")
    );
  }

  handleOk(): void {
    this.close();
  }

  handleCancel(): void {
    this.close();
  }

  close(): void {
    this.isVisibleResend = false;
    this.isVisibleResendChange.emit(this.isVisibleResend);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  resendInvitation(id: string) {
    let lang = "";
    this._store.pipe(select(selectSetting)).subscribe(data => {
      lang = data.lang;
    });

    this._store.dispatch(
      new ResendInvitation({ invitationId: id, language: lang }, res => {
        if (res) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
        this.close();
      })
    );
  }
}
