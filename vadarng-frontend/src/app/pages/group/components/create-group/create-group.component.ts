import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { NotificationService } from "src/app/services/notifications";
import { Create, Get, IGroupPagingRequest } from "src/app/redux/group";
import { CommonService } from "src/app/services/common/common.service";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-create-group",
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.less"]
})
export class CreateGroup implements OnInit {
  validateForm: FormGroup;
  @Input()
  isCreate: boolean;

  @Output()
  isCreateChange = new EventEmitter();

  @Input()
  data: IGroupPagingRequest;

  workspaceSelected$: Observable<any>;
  workspaceId = null;
  isCreating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _store: Store<any>,
    private notificationService: NotificationService,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
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
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = {
      ...this.validateForm.value,
      ...{ workspaceId: Number(this.workspaceId) }
    };
    this.isCreating = true;
    this._store.dispatch(
      new Create(dataSend, res => {
        if (res) {
          this.notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.data.workspaceId = this.workspaceId;
          this._store.dispatch(new Get(this.data));
        }
        this.isCreating = false;
      })
    );
  }
}
