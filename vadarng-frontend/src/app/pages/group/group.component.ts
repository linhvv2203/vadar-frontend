import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Get, IGroupPagingRequest } from "src/app/redux/group";
import { EnPermissions } from "src/app/enums/enums";
import { CommonService } from "src/app/services/common/common.service";
import { Observable } from "rxjs";
import { select as selectAuth } from "src/app/redux/auth";
import { Router } from "@angular/router";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "saf-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.less"]
})
export class GroupComponent implements OnInit {
  EnPermissions = EnPermissions;

  validateForm: FormGroup;
  isCreate: boolean = false;
  groupRequest: IGroupPagingRequest = {
    pageIndex: 1,
    pageSize: 10,
    workspaceId: null
  };
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private _store: Store<any>,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  onOpenFormCreate(): void {
    this.isCreate = true;
  }

  ngOnInit() {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.GroupView,
              EnPermissions.GroupSetting,
              EnPermissions.AllGroupsView
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
      groupName: [null]
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res && res.id > 0) {
        this.groupRequest.workspaceId = res.id;
      }
    });
  }

  GetGroup() {
    this._store.dispatch(new Get(this.groupRequest));
  }

  submitForm(): void {
    this.groupRequest = {
      ...this.groupRequest,
      ...this.validateForm.value
    };
    this.GetGroup();
  }
}
