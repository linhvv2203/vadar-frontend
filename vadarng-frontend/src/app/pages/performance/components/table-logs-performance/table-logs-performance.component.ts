import { Component, OnInit, Input } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import {
  Get,
  select as selectLogsPerformance,
  IHostQueryConditions
} from "src/app/redux/logs-performance";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-table-logs-performance",
  templateUrl: "./table-logs-performance.component.html",
  styleUrls: ["./table-logs-performance.component.less"]
})
export class TableLogsPerformanceComponent implements OnInit {
  confirmModal: NzModalRef;
  currentPageIndex = 1;
  hostQueryConditions: IHostQueryConditions = {};
  isPopupDetail = false;
  dataSelected = [];

  @Input()
  filter: object = {};

  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    private _modal: NzModalService,
    private _route: ActivatedRoute,
    public _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      if (params.params) {
        // parse data
        const data = this._commonService.decodeBase64(params.params);
        this.onSelect(data);
      }
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.model$ = this._store.pipe(select(selectLogsPerformance));
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
      }
    });
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
    this.confirmModal = this._modal.confirm({
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
