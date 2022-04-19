import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import {
  selectGetGroupPaging,
  Get,
  IGroupPagingRequest,
  Delete
} from "src/app/redux/group";
import { NzModalRef } from "ng-zorro-antd";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { EnPermissions } from "src/app/enums/enums";

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: "vadar-table-group",
  templateUrl: "./table-group.component.html",
  styleUrls: ["./table-group.component.less"]
})
export class TableScanedComponent implements OnInit {
  EnPermissions = EnPermissions;

  confirmModal: NzModalRef;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  model$: Observable<object>;
  currentPageIndex = 1;
  auth$: Observable<object>;
  @Input()
  data: IGroupPagingRequest;

  workspaceSelected$: Observable<any>;
  isVisible: boolean;
  idGroup: any;

  constructor(
    private store: Store<any>,
    private notificationService: NotificationService,
    public _commonService: CommonService
  ) {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.model$ = this.store.pipe(select(selectGetGroupPaging));
    this.auth$ = this.store.pipe(select(selectAuth));
    this.workspaceSelected$ = this.store.pipe(select(selectedWorkspacesHeader));
    this.workspaceSelected$.subscribe(res => {
      res && this.GetGroup({ ...this.data, workspaceId: res.id });
    });
  }

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

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }

  onCurrentPageIndexChange($event: number): void {
    this.data.pageIndex = $event;

    this.GetGroup(this.data);
  }

  GetGroup(dataRequest: IGroupPagingRequest) {
    this.store.dispatch(new Get(dataRequest));
  }

  delete(id: string) {
    this.store.dispatch(
      new Delete({ groupId: id }, res => {
        if (res) {
          this.GetGroup(this.data);
          this.notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  showConfirm(data: any): void {
    if (!data) {
      return;
    }
    this.isVisible = true;
    this.idGroup = data;
  }

  handleCallBackModal(res): void {
    if (res) this.delete(res);
  }
}
