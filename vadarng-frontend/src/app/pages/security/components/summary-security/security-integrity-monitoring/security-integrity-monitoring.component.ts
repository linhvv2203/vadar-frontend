import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  select as selectSecurityAlertsByActionOverTime,
  Get as GetSecurityAlertsByActionOverTime
} from "src/app/redux/security-alerts-by-action-over-time";
import {
  select as selectSecurityEventsSummary,
  Get as GetSecurityEventsSummary
} from "src/app/redux/security-events-summary";
import {
  select as selectSecurityTop5Agents,
  Get as GetSecurityTop5Agents
} from "src/app/redux/security-top-5-agents";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-security-integrity-monitoring",
  templateUrl: "./security-integrity-monitoring.component.html",
  styleUrls: ["./security-integrity-monitoring.component.less"]
})
export class SecurityIntegrityMonitoringComponent implements OnInit {
  securityAlertsByActionOverTime$: Observable<any>;
  securityTop5Agents$: Observable<any>;
  securityEventsSummary$: Observable<any>;
  workspaceSelected$: Observable<any>;
  param: object = {};
  workSpaceId = null;

  @Input()
  time: any = [];

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService
  ) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.workSpaceId = res.id;
      if (!this.time || !this.time.length) return;
      this.param = {
        fromDate: this.time[0],
        toDate: this.time[1]
      };
      this._store.dispatch(
        new GetSecurityAlertsByActionOverTime({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityTop5Agents({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityEventsSummary({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
    });
    this.securityAlertsByActionOverTime$ = this._store.pipe(
      select(selectSecurityAlertsByActionOverTime)
    );
    this.securityTop5Agents$ = this._store.pipe(
      select(selectSecurityTop5Agents)
    );
    this.securityEventsSummary$ = this._store.pipe(
      select(selectSecurityEventsSummary)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.param = {
      fromDate: currentValue[0],
      toDate: currentValue[1]
    };
    this._store.dispatch(
      new GetSecurityAlertsByActionOverTime({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityTop5Agents({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityEventsSummary({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }
  ngOnInit() {}
}
