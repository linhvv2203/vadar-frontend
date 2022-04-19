import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import {
  select as selectEvents,
  Get
} from "src/app/redux/performance-event-statistics";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-ds-events-performnce",
  templateUrl: "./ds-events-performnce.component.html",
  styleUrls: ["./ds-events-performnce.component.less"]
})
export class DsEventsPerformnceComponent implements OnInit, OnDestroy {
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  // interval
  intervalEvtPerforment = null;
  timeEvtPerforment = 300000;

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
    this.onSummaryTimeChange(this.timeEvtPerforment);
  }

  onSummaryTimeChange(event) {
    this.clearAllInterVal();
    if (!event) {
      return;
    }
    this.timeEvtPerforment = event;
    this._store.dispatch(new Get(Number(this.workspaceId)));
    this.intervalEvtPerforment = setInterval(() => {
      this._store.dispatch(new Get(Number(this.workspaceId)));
    }, this.timeEvtPerforment);
  }

  clearAllInterVal() {
    // clear interval
    this.intervalEvtPerforment && clearInterval(this.intervalEvtPerforment);
    this.intervalEvtPerforment = null;
  }
}
