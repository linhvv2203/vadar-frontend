import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import {
  IHostQueryConditions,
  GetNotExist,
  selectGetHostNotExist
} from "src/app/redux/host";
import {
  AddHostToGrroup,
  CheckHostAlreadyExistsInGroup,
  Detail
} from "src/app/redux/group";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { NotificationService } from "src/app/services/notifications";
import { EnPermissions } from "src/app/enums/enums";

@Component({
  selector: "vadar-add-host-to-group",
  templateUrl: "./add-host-to-group.component.html",
  styleUrls: ["./add-host-to-group.component.less"]
})
export class AddHostToGroupComponent implements OnInit {
  EnPermissions = EnPermissions;

  validateForm: FormGroup;
  nzFilterOption = () => true;

  query: Params = {
    pageSize: 0,
    pageIndex: 0,
    checkExist: 1
  };
  hosts$: Observable<object>;
  workspaceSelected$: Observable<any>;
  auth$: any;
  workspaceId = null;
  isVisible: boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public _commonService: CommonService,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = { ...this.query, ...params };
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      hostIds: [null, [Validators.required]]
    });

    this.hosts$ = this._store.pipe(select(selectGetHostNotExist));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.auth$ = this._store.pipe(select(selectAuth));
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.getHostNotExistGroup({
          ...this.query,
          workspaceId: res.id
        });
      }
    });
  }

  getHostNotExistGroup(dataRequest: IHostQueryConditions) {
    this._store.dispatch(
      new GetNotExist(dataRequest, () => {
        this.validateForm.reset();
      })
    );
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.addHost();
  }

  addHost() {
    const { value } = this.validateForm;
    this._store.dispatch(
      new AddHostToGrroup(
        { ...this.query, ...value, workspaceId: this.workspaceId },
        data => {
          if (data) {
            this._store.dispatch(
              new GetNotExist({
                ...this.query,
                workspaceId: this.workspaceId
              })
            );

            this._store.dispatch(
              new Detail({
                ...this.query,
                checkExist: 0,
                workspaceId: this.workspaceId
              })
            );

            this.validateForm.reset();

            this.notificationService.success(
              this._commonService.translateText("WORKSPACES.SUCCESS")
            );
          }
        }
      )
    );
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
    this._store.dispatch(
      new CheckHostAlreadyExistsInGroup(
        { ...this.query, ...value, workspaceId: this.workspaceId },
        res => {
          if (!res) {
            this.addHost();
          } else {
            this.isVisible = true;
          }
        }
      )
    );
  }
}
