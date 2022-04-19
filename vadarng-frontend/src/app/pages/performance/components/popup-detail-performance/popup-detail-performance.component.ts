import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "vadar-popup-detail-performance",
  templateUrl: "./popup-detail-performance.component.html",
  styleUrls: ["./popup-detail-performance.component.less"]
})
export class PopupDetailPerformanceComponent implements OnInit {
  grafanaPerformanceDashboardtUrl: any;

  @Input()
  dataSelected: any;

  @Input()
  isPopupDetail: boolean;

  @Output()
  isPopupDetailChange = new EventEmitter();

  workspaceSelected$: Observable<any>;

  constructor(
    public _commonService: CommonService,
    private _store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.grafanaPerformanceDashboardtUrl = this._commonService.getGrafanaPerformance(
          res,
          ""
        );
      }
    });
  }

  close(): void {
    this.isPopupDetail = false;
    this.isPopupDetailChange.emit(this.isPopupDetail);
  }
}
