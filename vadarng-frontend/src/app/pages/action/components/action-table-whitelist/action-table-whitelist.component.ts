import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import {
  selectWhiteList,
  Delete,
  DeleteMultil,
  IPolicyWhiteListPaging,
  GetPagingWhileList,
  selectWhiteListPaging
} from "src/app/redux/action-white-list";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { Router } from "@angular/router";
import { select as selectAuth } from "src/app/redux/auth";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-action-table-whitelist",
  templateUrl: "./action-table-whitelist.component.html",
  styleUrls: ["./action-table-whitelist.component.less"]
})
export class ActionTableWhitelistComponent implements OnInit {
  EnPermissions = EnPermissions;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  model$: Observable<any>;
  mapOfCheckedId: { [key: string]: boolean } = {};
  currentPageIndex = 1;

  isVisible: boolean;
  idGroup: any;
  isMulti: boolean;

  auth$: Observable<object>;
  whiteListRequest: IPolicyWhiteListPaging = { pageIndex: 1, pageSize: 10 };

  workspaceSelected$: Observable<any>;

  constructor(
    private _store: Store<IAppState>,
    private _noticeSer: NotificationService,
    public _commonService: CommonService,
    private _router: Router
  ) {
    this.isVisible = false;
    this.isMulti = false;
  }

  ngOnInit(): void {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.WhitelistIpView,
              EnPermissions.WhitelistIpSetting
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
        }
      }
    });
    // --- end Role & Permssion

    this.model$ = this._store.pipe(select(selectWhiteList));

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.whiteListRequest.workspaceId = res.id;
        this.getWhiteListPaging(this.whiteListRequest);
      }
    });
  }

  onPageChange($event: number): void {
    this.whiteListRequest.pageIndex = $event;
    this.getWhiteListPaging(this.whiteListRequest);
  }

  getWhiteListPaging(dataRequest: IPolicyWhiteListPaging) {
    this._store.dispatch(
      new GetPagingWhileList(dataRequest, res => {
        this.listOfDisplayData = res.items;
      })
    );
    this.model$ = this._store.pipe(select(selectWhiteListPaging));
  }

  showConfirm(data?: any): void {
    if (!data) {
      this.isMulti = true;
      this.idGroup = [];
      for (let key in this.mapOfCheckedId) {
        if (this.mapOfCheckedId[key]) {
          this.idGroup.push({
            ip: key
          });
        }
      }
      if (this.idGroup.length) {
        this.isVisible = true;
      } else {
        this._noticeSer.error(
          this._commonService.translateText("ACTION.NOT_SELECT_IP")
        );
      }
    } else {
      this.isMulti = false;
      this.idGroup = data;
      this.isVisible = true;
    }
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.isMulti ? this.deleteMulti() : this.delete();
  }

  delete() {
    this._store.dispatch(
      new Delete(this.idGroup, res => {
        if (res) {
          this._store.dispatch(
            new GetPagingWhileList({
              workspaceId: this.whiteListRequest.workspaceId,
              pageIndex: 1,
              pageSize: 10
            })
          );
          this._noticeSer.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  deleteMulti() {
    this._store.dispatch(
      new DeleteMultil(this.idGroup, res => {
        if (res) {
          this._store.dispatch(
            new GetPagingWhileList({
              workspaceId: this.whiteListRequest.workspaceId,
              pageIndex: 1,
              pageSize: 10
            })
          );
          this._noticeSer.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.ip]
    );
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.ip]) &&
      !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.ip] = value)
    );
    this.refreshStatus();
  }
}
