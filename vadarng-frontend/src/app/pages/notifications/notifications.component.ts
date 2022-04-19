import { Component, OnInit } from "@angular/core";
import {
  IAlertEmailRequest,
  GetListAlert,
  AddListAlert
} from "src/app/redux/notifications";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { Router } from "@angular/router";
import {
  EnPermissions,
  SecurityNotificationChannel
} from "src/app/enums/enums";

@Component({
  selector: "vadar-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.less"]
})
export class NotificationsComponent implements OnInit {
  EnPermissions = EnPermissions;
  SecurityNotificationChannel = SecurityNotificationChannel;

  validateForm: FormGroup;
  validateConditionForm: FormGroup;
  data: IAlertEmailRequest;
  switchValue = true;
  panels = [
    {
      name: "NOTIFICATIONS.NOTIFY",
      description: "NOTIFICATIONS.NOTIFY_DESCRIPTION",
      active: true
    },
    {
      name: "NOTIFICATIONS.NOTIFY_SETTING",
      description: "NOTIFICATIONS.NOTIFY_SETTING_DESCRIPTION",
      active: true
    }
  ];
  tagValue2 = [];
  showLabel = 1;
  auth$: Observable<object>;
  model$: Observable<any>;
  workspaceId = null;
  newCondition = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private _notificationService: NotificationService,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit() {
    // --- Role & Permission
    this.auth$ = this.store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.EmailNotificationView,
              EnPermissions.EmailNotificationSetting
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
        }
      }
    });
    // --- end Role & Permssion

    this.validateForm = this.fb.group({
      emails: [[], this.emailArrayValidator.bind(this)],
      slack: [[], [this.urlArrayValidator.bind(this)]],
      telegram: [[]],
      zalo: [[], [this.phoneArrayValidator.bind(this)]],
      sms: [[], [this.phoneArrayValidator.bind(this)]],
      status: true
    });

    this.model$ = this.store.pipe(select(selectedWorkspacesHeader));
    this.model$.subscribe(res => {
      if (res && res.id > 0) {
        this.workspaceId = res.id;
        this.getlistAlertEmail({
          ...this.data,
          workspaceId: res.id
        });
      }
    });
    //this.auth$ = this.store.pipe(select(selectAuth));
  }

  getlistAlertEmail(param: IAlertEmailRequest) {
    this.store.dispatch(
      new GetListAlert(param, rs => {
        for (let i in rs) {
          switch (rs[i].type) {
            case 0:
              this.validateForm.controls["emails"].setValue(rs[i].address);
              break;
            case 1:
              this.validateForm.controls["slack"].setValue(rs[i].address[0]);
              break;
            case 2:
              this.validateForm.controls["telegram"].setValue(rs[i].address[0]);
              break;
            case 3:
              this.validateForm.controls["zalo"].setValue(rs[i].address);
              break;
            case 4:
              this.validateForm.controls["sms"].setValue(rs[i].address);
              break;
            default:
              break;
          }
        }
        this.showLabel = 0;
      })
    );
  }

  submitForm() {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = {
      workspaceNotifications: [],
      workspaceId: this.workspaceId
    };
    let workspaceNotifications = [];
    for (const i in this.validateForm.value) {
      let value = this.validateForm.value[i];
      if (i !== "status") {
        workspaceNotifications.push({
          type: SecurityNotificationChannel[i],
          address:
            value !== null && value !== "" && value !== []
              ? Array.isArray(value)
                ? value
                : [value]
              : []
        });
      }
    }
    dataSend.workspaceNotifications = workspaceNotifications;
    this.store.dispatch(
      new AddListAlert(dataSend, ressult => {
        if (ressult) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  urlArrayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length != 0) {
      const urlAllValid = this._commonService.validateUrl(control.value);
      if (urlAllValid) {
        return null;
      }
      return { slackIsInvalid: true };
    }
  }

  phoneArrayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length != 0) {
      const phoneAllValid = control.value.every((value: string) => {
        return this._commonService.validatePhoneNumber(value);
      });
      if (phoneAllValid) {
        return null;
      }
      return { zaloIsInvalid: true, smsIsInvalid: true };
    }
  }

  emailArrayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.length != 0) {
      const emailsAllValid = control.value.every((value: string) => {
        return this._commonService.validateEmail(value);
      });
      if (emailsAllValid) {
        return null;
      }
      return { emailsIsInvalid: true };
    }
  }
}
