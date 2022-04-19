import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { GetPolicies } from "src/app/redux/action";
import { GetPagingWhileList } from "src/app/redux/action-white-list";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";

@Component({
  selector: "vadar-action-top",
  templateUrl: "./action-top.component.html",
  styleUrls: ["./action-top.component.less"]
})
export class ActionTopComponent implements OnInit {
  EnPermissions = EnPermissions;

  validateForm: FormGroup;

  @Input()
  isCreate: boolean;

  @Input()
  redirect: string;

  @Output()
  isCreateChange = new EventEmitter();

  @Input()
  tabIndex: number;

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  auth$: Observable<object>;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    public _commonService: CommonService
  ) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.workspaceId = res.id;
    });
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      url: [null]
    });
    this.auth$ = this._store.pipe(select(selectAuth));
  }

  onOpenFormCreate(): void {
    this.isCreate = true;
    this.isCreateChange.emit(this.isCreate);
  }

  submitForm(): void {
    const { value } = this.validateForm;
    if (this.tabIndex) {
      this.workspaceId &&
        this._store.dispatch(
          new GetPagingWhileList({
            workspaceId: this.workspaceId,
            ip: value.url
          })
        );
    } else {
      this.workspaceId &&
        this._store.dispatch(
          new GetPolicies({
            workspaceId: this.workspaceId,
            desciption: value.url
          })
        );
    }
  }
}
