import { Component, OnInit, Input } from "@angular/core";
import { Detail, selectDetail, DeleteGroup } from "src/app/redux/group";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Params, ActivatedRoute } from "@angular/router";
import { NzModalRef } from "ng-zorro-antd";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces/selectors";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { Get, GetNotExist } from "src/app/redux/host";
@Component({
  selector: "vadar-table-host-of-group",
  templateUrl: "./table-host-of-group.component.html",
  styleUrls: ["./table-host-of-group.component.less"]
})
export class TableHostOfGroupComponent implements OnInit {
  confirmModal: NzModalRef;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  model$: Observable<object>;
  mapOfCheckedId: { [key: string]: boolean } = {};
  currentPageIndex = 1;
  @Input()
  query: Params = {
    pageSize: 10,
    pageIndex: 1
  };

  workspaceSelected$: Observable<any>;
  workspaceId: number;

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

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }
  constructor(
    private _store: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    public _commonService: CommonService
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = { ...this.query, ...params };
    });
  }

  ngOnInit(): void {
    this.model$ = this._store.pipe(select(selectDetail));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.getHostPaging(res.id);
        this.workspaceId = res.id;
      }
    });
  }

  getHostPaging(workspaceId: any) {
    this._store.dispatch(new Detail({ ...this.query, workspaceId }));
  }

  onPageChange(event): void {
    this.currentPageIndex = event;
    this.query.pageIndex = event;
    this.workspaceId && this.getHostPaging(this.workspaceId);
  }

  removeToGroup(id): void {
    this._store.dispatch(
      new DeleteGroup({ id: [id], ...this.query }, res => {
        if (res) {
          this.notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this.workspaceId && this.getHostPaging(this.workspaceId);
          this._store.dispatch(
            new Get({
              ...this.query,
              workspaceId: String(this.workspaceId),
              checkExist: 0
            })
          );
          this._store.dispatch(
            new GetNotExist({
              ...this.query,
              workspaceId: String(this.workspaceId),
              checkExist: 1
            })
          );
        } else {
          this.notificationService.error(
            this._commonService.translateText("GLOBAL.ERROR")
          );
        }
      })
    );
  }
}
