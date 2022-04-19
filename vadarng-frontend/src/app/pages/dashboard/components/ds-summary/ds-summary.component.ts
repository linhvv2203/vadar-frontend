import { Component, OnDestroy, OnInit } from "@angular/core";
import { Get, select as selectSummary } from "src/app/redux/summary";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-ds-summary",
  templateUrl: "./ds-summary.component.html",
  styleUrls: ["./ds-summary.component.less"]
})
export class DsSummaryComponent implements OnInit, OnDestroy {
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  // interval
  intervalSummary = null;
  timeSummary = 300000;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this.model$ = this._store.pipe(select(selectSummary));
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
    this.onSummaryTimeChange(this.timeSummary);
  }

  onSummaryTimeChange(event) {
    this.clearAllInterVal();
    if (!event) {
      return;
    }
    this.timeSummary = event;
    this._store.dispatch(new Get(Number(this.workspaceId)));
    this.intervalSummary = setInterval(() => {
      this._store.dispatch(new Get(Number(this.workspaceId)));
    }, this.timeSummary);
  }

  clearAllInterVal() {
    // clear interval
    this.intervalSummary && clearInterval(this.intervalSummary);
    this.intervalSummary = null;
  }
}
