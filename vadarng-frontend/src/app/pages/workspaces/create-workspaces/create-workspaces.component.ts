import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import {
  Create,
  Get,
  IWorkspacePagingRequest,
  GetAllWorkspaceByUserId,
  Update
} from "src/app/redux/workspaces";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { ExpireStatus } from "src/app/enums/enums";
import setHours from "date-fns/setHours";
import { setMinutes, setSeconds } from "date-fns";

@Component({
  selector: "saf-create-workspaces",
  templateUrl: "./create-workspaces.component.html",
  styleUrls: ["./create-workspaces.component.less"]
})
export class CreateWorkspacesComponent implements OnInit {
  validateForm: FormGroup;
  @Input()
  isCreate: boolean;

  @Input()
  data: IWorkspacePagingRequest;

  @Output()
  isCreateChange = new EventEmitter();

  @Input()
  curentWP: any;

  @Output()
  curentWPChange = new EventEmitter();

  @Input()
  isUpdate: boolean;

  @Output()
  isUpdateChange = new EventEmitter();

  listRoles = [{ label: "demo", value: "demo" }];
  ExpireStatus = ExpireStatus;
  timeDefaultValue = setHours(new Date(), 0);

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _notificationService: NotificationService,
    private _commonService: CommonService
  ) {
    this.timeDefaultValue = setMinutes(this.timeDefaultValue, 0);
    this.timeDefaultValue = setSeconds(this.timeDefaultValue, 0);
    this.timeDefaultValue.setDate(this.timeDefaultValue.getDate() + 1);
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9_]*"),
          Validators.maxLength(30)
        ]
      ],
      status: [0],
      // members: [
      //   null,
      //   [Validators.required, this.emailArrayValidator.bind(this)]
      // ],
      hostLimit: [
        null,
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.max(10000),
          Validators.min(1)
        ]
      ],
      // roles: [[], []],
      endDate: [this.timeDefaultValue, [Validators.required]]
    });
  }

  checkDate(date) {
    return new Date(date) <= new Date();
  }

  disabledEndDates(endDate: Date) {
    if (!endDate) {
      return false;
    }
    return endDate.getTime() < new Date().getTime();
  }

  onChangeDate(date) {
    if (
      new Date(date) < new Date() &&
      this.validateForm.value.status === ExpireStatus.Active
    ) {
      this.validateForm.controls["status"].setValue(ExpireStatus.ExpiredDate);
    } else if (
      new Date(date) >= new Date() &&
      this.validateForm.value.status === ExpireStatus.ExpiredDate
    ) {
      this.validateForm.controls["status"].setValue(ExpireStatus.Active);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.validateForm) return;
    if (this.curentWP) {
      if (!this.isUpdate) this.validateForm.reset();
      else {
        this.curentWP["endDate"] = new Date(this.curentWP["endDate"]);
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].setValue(this.curentWP[i]);
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
    }
    if (this.isUpdate) this.validateForm.get("name").disable();
    else this.validateForm.get("name").enable();
  }

  emailArrayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null) {
      const emailsAllValid = control.value.every((value: string) => {
        return this._commonService.validateEmail(value);
      });
      if (emailsAllValid) {
        return null;
      }
      return { emailIsInvalid: true };
    }
  }

  onClose(): void {
    this.isCreate = false;
    this.isCreateChange.emit(this.isCreate);
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = this.validateForm.value;
    dataSend.endDate = setHours(dataSend.endDate, 23);
    dataSend.endDate = setMinutes(dataSend.endDate, 59);
    dataSend.endDate = setSeconds(dataSend.endDate, 0);

    if (this.isUpdate) {
      this._store.dispatch(
        new Update(
          { ...dataSend, id: this.curentWP.id, name: this.curentWP["name"] },
          res => {
            if (res) {
              this._notificationService.success(
                this._commonService.translateText("WORKSPACES.SUCCESS")
              );
              this._store.dispatch(new Get(this.data));
              this._store.dispatch(new GetAllWorkspaceByUserId());
            }
          }
        )
      );
    } else {
      this._store.dispatch(
        new Create(dataSend, res => {
          if (res) {
            this._notificationService.success(
              this._commonService.translateText("WORKSPACES.SUCCESS")
            );
            this._store.dispatch(new Get(this.data));
            this._store.dispatch(new GetAllWorkspaceByUserId());
          }
        })
      );
    }
  }
}
