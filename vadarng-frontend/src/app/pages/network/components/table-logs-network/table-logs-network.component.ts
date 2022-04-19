import { Component, OnInit, Input } from "@angular/core";
import {
  Get,
  ILogsNetworkRequest,
  selectLogsNetwork
} from "src/app/redux/logs-network";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { NzModalService, NzModalRef } from "ng-zorro-antd";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-table-logs-network",
  templateUrl: "./table-logs-network.component.html",
  styleUrls: ["./table-logs-network.component.less"]
})
export class TableLogsNetworkComponent implements OnInit {
  confirmModal: NzModalRef;
  currentPageIndex = 1;
  hostQueryConditions: ILogsNetworkRequest = {};
  isPopupDetail = false;
  dataSelected = [];

  @Input()
  filter: object = {};

  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.initDataByWorkspaceId();
      }
    });
  }

  initDataByWorkspaceId() {
    this.model$ = this._store.pipe(select(selectLogsNetwork));
  }

  onPageChange(event): void {
    this.currentPageIndex = event;
    this._store.dispatch(
      new Get({
        pageIndex: this.currentPageIndex,
        workspaceId: this.workspaceId,
        ...this.filter
      })
    );
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: "Do you Want to delete these items?",
      nzContent:
        "When clicked the OK button, this dialog will be closed after 1 second",
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"))
    });
  }
  onSelect(data): void {
    this.dataSelected = data;
    this.isPopupDetail = true;
  }
}
