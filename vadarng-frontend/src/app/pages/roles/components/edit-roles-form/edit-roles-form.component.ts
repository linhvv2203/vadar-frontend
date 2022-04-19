import { AssignPermissionToRole } from "./../../../../redux/workspaceRoles/actions";
import { Component, OnInit } from "@angular/core";
import { ItemData } from "src/app/redux/host";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectGetGroupPaging } from "src/app/redux/group";
import {
  GetPermissionsByWorkspaceRoleIdAndUserId,
  selectPermissions
} from "src/app/redux/workspaceRoles";
import { select as selectAuth } from "src/app/redux/auth";
import { LocalStorageService } from "src/app/services/local-storage";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { ActivatedRoute, Params } from "@angular/router";
import { EnPermissions } from "src/app/enums/enums";

const localStorageInstance = new LocalStorageService();
@Component({
  selector: "vadar-edit-roles-form",
  templateUrl: "./edit-roles-form.component.html",
  styleUrls: ["./edit-roles-form.component.less"]
})
export class EditRolesFormComponent implements OnInit {
  EnPermissions = EnPermissions;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  model$: Observable<any>;
  userId = undefined;
  isVisible = false;
  isAdd = true;
  result = [];
  exceptResult = [];

  isAllDisplayDataCheckedCurent = false;
  isIndeterminateCurent = false;
  listOfDisplayDataCurent: ItemData[] = [];
  mapOfCheckedIdCurent: { [key: string]: boolean } = {};
  modelCurent$: Observable<object>;
  query: Params;
  auth$: Observable<object>;
  currentPageDataChange($event: ItemData[]): void {
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

  assignPermissions() {
    // Update assigned list

    this.result = [];
    for (const key of Object.keys(this.mapOfCheckedId)) {
      this.mapOfCheckedId[key] && this.result.push(key);
    }

    if (!this.result.length) return;

    this.showModal(true);
  }

  unAssignPermissions() {
    // Update assigned list
    this.result = [];
    this.exceptResult = [];
    for (const key of Object.keys(this.mapOfCheckedIdCurent)) {
      this.mapOfCheckedIdCurent[key] && this.exceptResult.push(Number(key));
    }

    if (!this.exceptResult.length) return;

    this.showModal(false);
  }

  assignPermissionToRole(permissionIds, roleId) {
    this._store.dispatch(
      new AssignPermissionToRole(
        { workspaceRoleId: roleId, permissionIds },
        res => {
          if (res) {
            this.mapOfCheckedId = {};
            this.mapOfCheckedIdCurent = {};
            this.getPermissions();
            this._notificationService.success(
              this._commonService.translateText("WORKSPACES.SUCCESS")
            );
          }
        }
      )
    );
  }

  getPermissions() {
    if (this.query["id"]) {
      this._store.dispatch(
        new GetPermissionsByWorkspaceRoleIdAndUserId({
          workspaceRoleId: this.query["id"]
        })
      );
      this.model$ = this._store.select(selectPermissions);
    }
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }

  currentPageDataChangeCurent($event: ItemData[]): void {
    this.listOfDisplayDataCurent = $event;
    this.refreshStatusCurent();
  }

  refreshStatusCurent(): void {
    this.isAllDisplayDataCheckedCurent = this.listOfDisplayDataCurent.every(
      item => this.mapOfCheckedIdCurent[item.id]
    );
    this.isIndeterminateCurent =
      this.listOfDisplayDataCurent.some(
        item => this.mapOfCheckedIdCurent[item.id]
      ) && !this.isAllDisplayDataCheckedCurent;
  }

  checkAllCurent(value: boolean): void {
    this.listOfDisplayDataCurent.forEach(
      item => (this.mapOfCheckedIdCurent[item.id] = value)
    );
    this.refreshStatusCurent();
  }

  constructor(
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService,
    private router: ActivatedRoute
  ) {
    this.router.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
  }

  ngOnInit(): void {
    this.auth$ = this._store.pipe(select(selectAuth));
    this.model$ = this._store.pipe(select(selectGetGroupPaging));
    this.modelCurent$ = this._store.pipe(select(selectGetGroupPaging));
    this.userId = localStorageInstance.getItem("userData").sub;
    this.getPermissions();
  }

  showModal(check): void {
    this.isVisible = true;
    this.isAdd = check;
  }

  handleCallBackModal(check) {
    if (check) {
      if (this.isAdd) {
        for (let i = 0; i < this.listOfDisplayDataCurent.length; i++) {
          this.result.push(this.listOfDisplayDataCurent[i].id);
        }
        this.assignPermissionToRole(this.result, this.query["id"]);
      } else {
        for (let i = 0; i < this.listOfDisplayDataCurent.length; i++) {
          if (
            this.exceptResult.indexOf(this.listOfDisplayDataCurent[i].id) < 0
          ) {
            this.result.push(this.listOfDisplayDataCurent[i].id);
          }
        }

        this.assignPermissionToRole(this.result, this.query["id"]);
      }
    }
  }
}
