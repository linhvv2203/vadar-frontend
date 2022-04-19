import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Get, IHostQueryConditions } from "src/app/redux/host";
import { Get as Group } from "src/app/redux/group";
import { Observable } from "rxjs";
import { selectGetGroupPaging, IGroupPagingRequest } from "src/app/redux/group";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";

@Component({
  selector: "vadar-host-top",
  templateUrl: "./top.component.html",
  styleUrls: ["./top.component.less"]
})
export class TopComponent implements OnInit {
  EnPermissions = EnPermissions;

  validateForm: FormGroup;

  @Input()
  isCreate: boolean;

  @Input()
  redirect: string;

  @Output()
  isCreateChange = new EventEmitter();

  @Input()
  filter: string;

  @Output()
  filterChange = new EventEmitter();

  @Input()
  filterGroupId: string;

  @Output()
  filterGroupIdChange = new EventEmitter();

  model$: Observable<object>;

  workspaceSelected$: Observable<any>;
  workspaceId = null;
  data: IGroupPagingRequest;
  auth$: Observable<object>;

  hostRequest: IHostQueryConditions = { pageIndex: 1, pageSize: 10 };

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.validateForm = this._fb.group({
      url: [null],
      groupId: [null]
    });
    this.model$ = this._store.pipe(select(selectGetGroupPaging));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.GetGroup({ ...this.data, workspaceId: res.id });
      }
    });
    this.auth$ = this._store.pipe(select(selectAuth));
  }

  GetGroup(dataRequest: IGroupPagingRequest) {
    this._store.dispatch(new Group(dataRequest));
  }

  onOpenFormCreate(): void {
    this.isCreate = true;
    this.isCreateChange.emit(this.isCreate);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.filterChange.emit(this.validateForm.controls["url"].value);
    this.filterGroupIdChange.emit(this.validateForm.controls["groupId"].value);

    this.hostRequest = {
      pageSize: 10,
      pageIndex: 1,
      hostName: this.validateForm.controls["url"].value,
      groupId: this.validateForm.controls["groupId"].value
    };

    this._store.dispatch(
      new Get({ ...this.hostRequest, workspaceId: this.workspaceId })
    );
  }
}
