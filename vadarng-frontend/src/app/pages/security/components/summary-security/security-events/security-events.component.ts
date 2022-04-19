import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import {
  Get as GetAlertLevel,
  select as selectAlertLevelEvolution
} from "src/app/redux/security-alert-level-evolution";
import {
  Get as GetAlerts,
  select as selectAlertS
} from "src/app/redux/security-alerts";
import {
  Get as GetLogSecurity,
  select as selectLogSecurity
} from "src/app/redux/log-security-summary";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  Get as GetTopEventsByAgents,
  select as selectTopEventsByAgents
} from "src/app/redux/security-top-event-by-agents";
import {
  Get as GetAgentsStatusStatistical,
  select as selectAgentsStatusStatistical
} from "src/app/redux/security-agent-status-statistical";
import { CommonService } from "src/app/services/common/common.service";
@Component({
  selector: "vadar-security-events",
  templateUrl: "./security-events.component.html",
  styleUrls: ["./security-events.component.less"]
})
export class SecurityEventsComponent implements OnInit {
  agentStatusStatistical$: Observable<any>;
  topEventsByAgent$: Observable<any>;
  securityAlertLevelEvolution$: Observable<object>;
  securityAlerts$: Observable<object>;
  workspaceSelected$: Observable<any>;
  logSecuritySummary$: Observable<any>;
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
        fromDate: this.time[0].toJSON(),
        toDate: this.time[1].toJSON()
      };
      this._store.dispatch(
        new GetAlertLevel({
          ...this.param,
          workSpaceId: this.workSpaceId,
          searchLevel: true
        })
      );
      this._store.dispatch(
        new GetAlerts({
          ...this.param,
          workSpaceId: this.workSpaceId,
          searchLevel: false
        })
      );
      this._store.dispatch(
        new GetLogSecurity({ ...this.param, workSpaceId: this.workSpaceId })
      );
      this._store.dispatch(
        new GetTopEventsByAgents({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetAgentsStatusStatistical({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
    });
    this.securityAlertLevelEvolution$ = this._store.pipe(
      select(selectAlertLevelEvolution)
    );
    this.securityAlerts$ = this._store.pipe(select(selectAlertS));
    this.logSecuritySummary$ = this._store.pipe(select(selectLogSecurity));
    this.topEventsByAgent$ = this._store.pipe(select(selectTopEventsByAgents));
    this.agentStatusStatistical$ = this._store.pipe(
      select(selectAgentsStatusStatistical)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.param = {
      fromDate: currentValue[0].toJSON(),
      toDate: currentValue[1].toJSON()
    };

    this._store.dispatch(
      new GetAlertLevel({
        ...this.param,
        workSpaceId: this.workSpaceId,
        searchLevel: true
      })
    );
    this._store.dispatch(
      new GetAlerts({
        ...this.param,
        workSpaceId: this.workSpaceId,
        searchLevel: false
      })
    );
    this._store.dispatch(
      new GetLogSecurity({ ...this.param, workSpaceId: this.workSpaceId })
    );
    this._store.dispatch(
      new GetTopEventsByAgents({ ...this.param, workSpaceId: this.workSpaceId })
    );
    this._store.dispatch(
      new GetAgentsStatusStatistical({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }

  ngOnInit() {}
}
