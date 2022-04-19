import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  SecurityNotificationCondition,
  SecurityNotificationChannel
} from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { IAppState } from "src/app/redux/app.state";
import {
  AddListAlertSetting,
  GetListAlertSetting,
  CheckSecurityAlertCondition,
  DeleteSecurityConditionSetting
} from "src/app/redux/notifications";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { string } from "@amcharts/amcharts4/core";

@Component({
  selector: "vadar-notification-setting",
  templateUrl: "./notification-setting.component.html",
  styleUrls: ["./notification-setting.component.less"]
})
export class NotificationSettingComponent implements OnInit {
  validateSecurityForm: FormGroup;
  validatePerformanceForm: FormGroup;
  validateNetworkForm: FormGroup;
  validateTicketForm: FormGroup;

  SecurityNotificationCondition = SecurityNotificationCondition;
  SecurityNotificationChannel = SecurityNotificationChannel;

  workspaceSelected$: Observable<any>;

  listCondition = [];
  workspaceId = null;
  isAddNew = true;
  isConfirmPopup = false;
  isAddCondition: boolean;

  constructor(
    private fb: FormBuilder,
    private _store: Store<IAppState>,
    private store: Store<IAppState>,
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateSecurityForm = this.fb.group({
      newLevel: [
        7,
        [Validators.required, Validators.min(1), Validators.max(15)]
      ],
      newChannel: [SecurityNotificationChannel.emails, [Validators.required]],
      newCondition: [
        SecurityNotificationCondition.Above,
        [Validators.required]
      ],
      security: [false]
    });
    this.validatePerformanceForm = this.fb.group({
      performance: [false]
    });
    this.validateNetworkForm = this.fb.group({
      network: [false]
    });
    this.validateTicketForm = this.fb.group({
      ticket: [false]
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );

    this.workspaceSelected$.subscribe(res => {
      if (res && res.id > 0) {
        this.workspaceId = res.id;
        this.getlistAlertSetting({
          workspaceId: res.id
        });
      }
    });
  }

  getlistAlertSetting(param) {
    this.store.dispatch(
      new GetListAlertSetting(param, res => {
        if (res) {
          for (let i in res) {
            switch (res[i].name) {
              case "New Ticket Assignment":
                this.validateTicketForm.controls["ticket"].setValue(
                  res[i].activate
                );
                break;
              case "New Performance Event":
                this.validatePerformanceForm.controls["performance"].setValue(
                  res[i].activate
                );
                break;
              case "New Network Security":
                this.validateNetworkForm.controls["network"].setValue(
                  res[i].activate
                );
                break;
              case "New Security Event":
                this.validateSecurityForm.controls["security"].setValue(
                  res[i].activate
                );
                this.listCondition = res[i].notificationSettingConditions;

                for (let index in this.listCondition) {
                  //remove old control if exist
                  this.validateSecurityForm.removeControl(
                    "condition-" + this.listCondition[index].id
                  );
                  this.validateSecurityForm.removeControl(
                    "value-" + this.listCondition[index].id
                  );
                  this.validateSecurityForm.removeControl(
                    "notificationType-" + this.listCondition[index].id
                  );

                  // add new control
                  this.validateSecurityForm.addControl(
                    "condition-" + this.listCondition[index].id,
                    new FormControl(this.listCondition[index].condition)
                  );
                  this.validateSecurityForm.addControl(
                    "value-" + this.listCondition[index].id,
                    new FormControl(this.listCondition[index].value)
                  );
                  this.validateSecurityForm.addControl(
                    "notificationType-" + this.listCondition[index].id,
                    new FormControl(this.listCondition[index].notificationType)
                  );
                }
                break;
              default:
                break;
            }
          }
        }
      })
    );
  }

  removeCondition(index) {
    let dataSend = {
      workspaceId: this.workspaceId,
      name: "New Security Event",
      conditionId: this.listCondition[index].id
    };
    this.store.dispatch(
      new DeleteSecurityConditionSetting(dataSend, ressult => {
        if (ressult) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.getlistAlertSetting({
            workspaceId: this.workspaceId
          });
        }
      })
    );
  }

  checkSecurityCondition() {
    if (this.validateSecurityForm.invalid) {
      for (const i in this.validateSecurityForm.controls) {
        this.validateSecurityForm.controls[i].markAsDirty();
        this.validateSecurityForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const dataSend = {
      notificationSettings: {
        name: "New Security Event",
        activate: true,
        notificationSettingConditions: [
          {
            condition: this.validateSecurityForm.controls["newCondition"].value,
            value: this.validateSecurityForm.controls["newLevel"].value,
            notificationType: this.validateSecurityForm.controls["newChannel"]
              .value
          }
        ]
      },
      workspaceId: this.workspaceId
    };

    this.store.dispatch(
      new CheckSecurityAlertCondition(dataSend, ressult => {
        if (ressult) {
          this.submitSecurityForm();
        } else {
          this.isConfirmPopup = true;
        }
      })
    );
  }

  receiveMessage($event) {
    this.isAddNew = $event;
    if (this.isAddNew) {
      this.submitSecurityForm();
    }
  }

  submitSecurityForm() {
    this.submitConditionForm(this.validateSecurityForm, "New Security Event");
  }

  submitTicketForm() {
    this.submitConditionForm(this.validateTicketForm, "New Ticket Assignment");
  }

  submitPerformanceForm() {
    this.submitConditionForm(
      this.validatePerformanceForm,
      "New Performance Event"
    );
  }

  submitNetworkForm() {
    this.submitConditionForm(this.validateNetworkForm, "New Network Security");
  }

  submitConditionForm(form, name) {
    let notificationSettings = [];
    if (name == "New Security Event") {
      notificationSettings = [
        ...this.listCondition,
        {
          condition: this.validateSecurityForm.controls["newCondition"].value,
          value: this.validateSecurityForm.controls["newLevel"].value,
          notificationType: this.validateSecurityForm.controls["newChannel"]
            .value
        }
      ];
    }

    let securityConditionSettings = notificationSettings;
    let value =
      name == "New Security Event"
        ? form.value["security"]
        : Object.values(form.value)[0];

    const dataSend = {
      notificationSettings: {
        name: name,
        activate: value,
        notificationSettingConditions: securityConditionSettings
      },
      workspaceId: this.workspaceId
    };

    this.store.dispatch(
      new AddListAlertSetting(dataSend, ressult => {
        if (ressult) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );

          if (name == "New Security Event") {
            this.isAddNew = true;
            this.validateSecurityForm.controls["newLevel"].setValue(7);
            this.validateSecurityForm.controls["newChannel"].setValue(
              SecurityNotificationChannel.emails
            );
            this.validateSecurityForm.controls["newCondition"].setValue(
              SecurityNotificationCondition.Above
            );
            this.getlistAlertSetting({
              workspaceId: this.workspaceId
            });
          }
        }
      })
    );
  }

  toggleAddForm() {
    this.isAddNew = !this.isAddNew;
  }
}
