import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  select as selectSecurityAlertsEvolutionOverTime,
  Get
} from "src/app/redux/security-alert-evolution-over-time";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-mitre-att-ck",
  templateUrl: "./mitre-att-ck.component.html",
  styleUrls: ["./mitre-att-ck.component.less"]
})
export class MitreAttCkComponent implements OnInit {
  securityAlertEvolutionOverTime$: Observable<any>;
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
        new Get({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
    });
    this.securityAlertEvolutionOverTime$ = this._store.pipe(
      select(selectSecurityAlertsEvolutionOverTime)
    );
  }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.param = {
      fromDate: currentValue[0].toJSON(),
      toDate: currentValue[1].toJSON()
    };
    this._store.dispatch(
      new Get({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }
}
