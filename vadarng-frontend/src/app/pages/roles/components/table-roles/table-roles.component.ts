import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import {
  GetAllWorkspaceRolesByWorkspaceId,
  selectAll,
  DeleteByListId,
  Delete,
  IWorkspaceRolePaging,
  GetAllWorkspaceRolesPaging,
  selectWorkspaceRolePaging
} from "src/app/redux/workspaceRoles";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-table-roles",
  templateUrl: "./table-roles.component.html",
  styleUrls: ["./table-roles.component.less"]
})
export class TableRolesComponent implements OnInit {
  EnPermissions = EnPermissions;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  model$: Observable<any>;

  isVisible: boolean;
  idRoles: any;
  isMulti: boolean;
  auth$: Observable<object>;

  workspaceRoleRequest: IWorkspaceRolePaging = { pageIndex: 1, pageSize: 10 };
  workspaceSelected$: Observable<any>;

  constructor(
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {
    this.isVisible = false;
    this.isMulti = false;
  }

  ngOnInit(): void {
    this.auth$ = this._store.pipe(select(selectAuth));

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceRoleRequest.workspaceId = res.id;
        this.getWorkspaceRolePaging(this.workspaceRoleRequest);
      }
    });
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.id]
    );
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }

  getRolesByWorkspaceId() {
    if (
      this.workspaceRoleRequest.workspaceId &&
      this.workspaceRoleRequest.workspaceId > 0
    ) {
      this._store.dispatch(
        new GetAllWorkspaceRolesByWorkspaceId({
          workspaceId: Number(this.workspaceRoleRequest.workspaceId)
        })
      );
      this.model$ = this._store.select(selectAll);
    }
  }

  onPageChange($event: number): void {
    this.workspaceRoleRequest.pageIndex = $event;
    this.workspaceRoleRequest.workspaceId = this.workspaceRoleRequest.workspaceId;
    this.getWorkspaceRolePaging(this.workspaceRoleRequest);
  }

  getWorkspaceRolePaging(dataRequest: IWorkspaceRolePaging) {
    this.model$ = this._store.pipe(select(selectWorkspaceRolePaging));
    this._store.dispatch(new GetAllWorkspaceRolesPaging(dataRequest));
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }

  delete(workspaceId: number) {
    this._store.dispatch(
      new Delete({ workspaceRoleId: workspaceId }, res => {
        if (res) {
          this._store.dispatch(
            new GetAllWorkspaceRolesPaging({
              workspaceId: this.workspaceRoleRequest.workspaceId,
              pageIndex: 1,
              pageSize: 10
            })
          );
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.mapOfCheckedId = {};
        }
      })
    );
  }

  deleteByListId(workspaceRoleIds: string[]) {
    this._store.dispatch(
      new DeleteByListId({ workspaceRoleIds }, res => {
        if (res) {
          this.getWorkspaceRolePaging(this.workspaceRoleRequest);
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.mapOfCheckedId = {};
        }
      })
    );
  }

  showConfirm(data?: any): void {
    if (!data) {
      this.isMulti = true;
      this.idRoles = [];
      for (let key in this.mapOfCheckedId) {
        if (
          this.mapOfCheckedId.hasOwnProperty(key) &&
          this.mapOfCheckedId[key]
        ) {
          this.idRoles.push(key);
        }
      }
      if (this.idRoles.length) this.isVisible = true;
    } else {
      this.isMulti = false;
      this.idRoles = data;
      this.isVisible = true;
    }
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.isMulti
      ? this.deleteByListId(this.idRoles)
      : this.delete(this.idRoles);
  }
}
