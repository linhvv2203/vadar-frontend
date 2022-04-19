import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import {
  Create,
  GetAllWorkspaceRolesPaging
} from "src/app/redux/workspaceRoles";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-create-roles",
  templateUrl: "./create-roles.component.html",
  styleUrls: ["./create-roles.component.less"]
})
export class CreateRolesComponent implements OnInit {
  validateForm: FormGroup;
  @Input()
  isCreate: boolean;

  @Output()
  isCreateChange = new EventEmitter();

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<any>,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateForm = this._fb.group({
      name: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9_]*")]]
    });
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
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
      // tslint:disable-next-line:forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = { ...this.validateForm.value };
    dataSend.workspaceId = Number(this.workspaceId);
    this._store.dispatch(
      new Create(dataSend, res => {
        if (res) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this._store.dispatch(
            new GetAllWorkspaceRolesPaging({
              workspaceId: Number(this.workspaceId),
              pageIndex: 1,
              pageSize: 10
            })
          );
        }
      })
    );
  }
}
