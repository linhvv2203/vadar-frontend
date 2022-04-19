import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Add as AddWhitelist } from "src/app/redux/action-white-list";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { CommonService } from "src/app/services/common/common.service";
import { NotificationService } from "src/app/services/notifications";
import { GetPagingWhileList } from "src/app/redux/action-white-list";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-action-create",
  templateUrl: "./action-create.component.html",
  styleUrls: ["./action-create.component.less"]
})
export class ActionCreateComponent implements OnInit {
  validateForm: FormGroup;

  @Input()
  tabIndex: number;

  @Input()
  isCreate: boolean;

  @Output()
  isCreateChange = new EventEmitter();

  workspaceSelected$: Observable<any>;
  currentWorkspaceId = null;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private notificationService: NotificationService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateForm = this._fb.group({
      name: [null],
      ip: [[], [Validators.required, this.ipArrayValidator.bind(this)]],
      description: [null]
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.currentWorkspaceId = res.id;
    });
  }

  onClose(): void {
    this.isCreate = false;
    this.isCreateChange.emit(this.isCreate);
  }

  onOpen(): void {
    this.isCreate = true;
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

    const { value } = this.validateForm;
    if (this.tabIndex === 0) {
    } else {
      this._store.dispatch(
        new AddWhitelist(
          {
            ip: value.ip,
            description: value.description,
            workspaceId: this.currentWorkspaceId
          },
          res => {
            if (res) {
              this.notificationService.success(
                this._commonService.translateText("WORKSPACES.SUCCESS")
              );
              this.validateForm.controls["ip"].setValue([]);
              this._store.dispatch(
                new GetPagingWhileList({
                  workspaceId: this.currentWorkspaceId,
                  pageIndex: 1,
                  pageSize: 10
                })
              );
            }
          }
        )
      );
    }
  }

  ipArrayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null) {
      const ipAllValid = control.value.every((value: string) => {
        return this._commonService.validateIp(value);
      });
      if (ipAllValid) {
        return null;
      }
      return { ipIsInvalid: true };
    }
  }
}
