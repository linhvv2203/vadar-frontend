import { Component, OnInit, Input } from "@angular/core";
import { Delete, Get, selectGroupPaging } from "src/app/redux/host";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { NzModalService, NzModalRef } from "ng-zorro-antd";
import { IHostQueryConditions } from "src/app/redux/host";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { EnPermissions, EnTypeOfDevices } from "src/app/enums/enums";
import { select as selectAuth } from "src/app/redux/auth";
import { Params, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/services/notifications";
@Component({
  selector: "vadar-table-host",
  templateUrl: "./table-host.component.html",
  styleUrls: ["./table-host.component.less"]
})
export class TableHostComponent implements OnInit {
  EnPermissions = EnPermissions;
  EnDeviceTypeId = EnTypeOfDevices;
  confirmModal: NzModalRef;
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  currentPageIndex = 1;
  hostRequest: IHostQueryConditions = { pageIndex: 1, pageSize: 10 };
  auth$: Observable<object>;
  grafanaInventoryDashboardtUrl: any;
  grafanaSecurityDashboardtUrl: any;
  grafanaPerformanceDashboardtUrl: any;
  query: Params;
  isVisible = false;
  idHost: string;
  workspaceId: string;

  @Input()
  filter: string = "";

  @Input()
  filterGroupId: string = "";

  constructor(
    private _store: Store<IAppState>,
    private _modal: NzModalService,
    public _commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
    this.hostRequest = {
      pageSize: 10,
      pageIndex: 1,
      hostName: this.filter,
      groupId: this.filterGroupId,
      status: this.query.status
    };
  }

  ngOnInit(): void {
    this.model$ = this._store.pipe(select(selectGroupPaging));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.model$.subscribe(res => {
      if (res) {
      }
    });
    this.auth$ = this._store.pipe(select(selectAuth));
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.getHostPaging({ ...this.hostRequest, workspaceId: res.id });

        this.grafanaInventoryDashboardtUrl = this._commonService.getGrafanaInventory(
          res,
          ""
        );

        this.grafanaPerformanceDashboardtUrl = this._commonService.getGrafanaPerformance(
          res,
          ""
        );

        this.grafanaSecurityDashboardtUrl = this._commonService.getGrafanaSecurity(
          res,
          ""
        );
      }
    });
  }

  getHostPaging(dataRequest: IHostQueryConditions) {
    this._store.dispatch(new Get(dataRequest));
  }

  getDeviceTypeDescription(type) {
    switch (type) {
      case this.EnDeviceTypeId.Client:
        return this._commonService.translateText("HOST.CLIENT");
      case this.EnDeviceTypeId.Server:
        return this._commonService.translateText("HOST.SERVER");
      case this.EnDeviceTypeId.NetworkEquipment:
        return this._commonService.translateText("HOST.NETWORK_DEVICE");
    }
  }

  onPageChange($event: number): void {
    this.hostRequest.pageIndex = $event;
    this.workspaceSelected$.subscribe(res => {
      res &&
        this.getHostPaging({
          ...this.hostRequest,
          workspaceId: res.id,
          status: this.query.status
        });
    });
  }

  showConfirm(data: any): void {
    if (!data) {
      return;
    }
    this.isVisible = true;
    this.idHost = data;
  }

  getOrdinalNumbers(index: number) {
    if (this.hostRequest.pageIndex && this.hostRequest.pageIndex <= 0) {
      this.hostRequest.pageIndex = 1;
    }

    return (
      (this.hostRequest.pageIndex - 1) * this.hostRequest.pageSize + index + 1
    );
  }

  handleCallBackModal(res): void {
    if (res) this.delete(res);
  }

  delete(id: string) {
    this._store.dispatch(
      new Delete({ hostId: id, workspaceId: this.workspaceId }, res => {
        if (res) {
          this.getHostPaging({
            ...this.hostRequest,
            workspaceId: this.workspaceId
          });
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }
}
