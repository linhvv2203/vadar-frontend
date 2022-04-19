import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import {
  GetMembersByWorkspace,
  selectMembersByWorkspace
} from "src/app/redux/members";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { Router } from "@angular/router";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-table-members",
  templateUrl: "./table-members.component.html",
  styleUrls: ["./table-members.component.less"]
})
export class TableMembersComponent implements OnInit {
  EnPermissions = EnPermissions;

  confirmModal: NzModalRef;
  isShowPopupAddMember = false;

  @Input()
  memberSelected: any;

  @Output()
  memberSelectedChange = new EventEmitter();

  auth$: Observable<object>;
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<any>,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.WorkspacePermissionView
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
          return;
        }
      }
    });
    // --- end Role & Permssion

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });

    this.model$ = this._store.pipe(select(selectMembersByWorkspace));
  }

  submitForm(): void {
    this._store.dispatch(
      new GetMembersByWorkspace({
        workspaceId: Number(this.workspaceId)
      })
    );
  }

  onSelectedItem(data: any) {
    this.memberSelectedChange.emit(data);
  }
}
