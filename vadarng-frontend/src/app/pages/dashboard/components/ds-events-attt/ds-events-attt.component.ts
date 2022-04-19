import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Observable } from "rxjs";
import {
  select as selectEvents,
  Get
} from "src/app/redux/security-event-statistics";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-ds-events-attt",
  templateUrl: "./ds-events-attt.component.html",
  styleUrls: ["./ds-events-attt.component.less"]
})
export class DsEventsAtttComponent implements OnInit, OnDestroy {
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  // interval
  intervalEvtSecurity = null;
  timeEvtSecurity = 300000;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this.model$ = this._store.pipe(select(selectEvents));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.getDashboardInfor();
      }
    });
  }

  ngOnDestroy() {
    this.clearAllInterVal();
  }

  getDashboardInfor() {
    this.onSummaryTimeChange(this.timeEvtSecurity);
  }

  onSummaryTimeChange(event) {
    this.clearAllInterVal();
    if (!event) {
      return;
    }
    this.timeEvtSecurity = event;
    this._store.dispatch(new Get(Number(this.workspaceId)));
    this.intervalEvtSecurity = setInterval(() => {
      this._store.dispatch(new Get(Number(this.workspaceId)));
    }, this.timeEvtSecurity);
  }

  clearAllInterVal() {
    // clear interval
    this.intervalEvtSecurity && clearInterval(this.intervalEvtSecurity);
    this.intervalEvtSecurity = null;
  }
}
