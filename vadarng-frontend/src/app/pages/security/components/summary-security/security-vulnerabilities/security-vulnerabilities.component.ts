import { Component, Input, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  select as selectSecurityMostAffectedAgents,
  Get as GetSecurityMostAffectedAgents
} from "src/app/redux/security-most-affected-agents";
import {
  select as selectSecurityAlertsSeverity,
  Get as GetSecurityAlertsSeverity
} from "src/app/redux/security-alerts-severity";
import {
  select as selectSecurityMostCommonCVEs,
  Get as GetSecurityMostCommonCVEs
} from "src/app/redux/security-most-common-CVEs";
import {
  select as selectSecurityMostCommonCWEs,
  Get as GetSecurityMostCommonCWEs
} from "src/app/redux/security-most-common-CWEs";

import {
  select as selectSecurityVulSummary,
  Get as GetSecurityVulSummary
} from "src/app/redux/security-vul-summary";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-security-vulnerabilities",
  templateUrl: "./security-vulnerabilities.component.html",
  styleUrls: ["./security-vulnerabilities.component.less"]
})
export class SecurityVulnerabilitiesComponent {
  securityMostAffectedAgents$: Observable<any>;
  securityAlertsSeverity$: Observable<any>;
  securityMostCommonCVEs$: Observable<any>;
  securityMostCommonCWEs$: Observable<any>;
  securityVulSummary$: Observable<any>;
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
        new GetSecurityMostAffectedAgents({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityAlertsSeverity({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityMostCommonCVEs({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityMostCommonCWEs({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetSecurityVulSummary({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
    });
    this.securityMostAffectedAgents$ = this._store.pipe(
      select(selectSecurityMostAffectedAgents)
    );
    this.securityAlertsSeverity$ = this._store.pipe(
      select(selectSecurityAlertsSeverity)
    );
    this.securityMostCommonCVEs$ = this._store.pipe(
      select(selectSecurityMostCommonCVEs)
    );
    this.securityMostCommonCWEs$ = this._store.pipe(
      select(selectSecurityMostCommonCWEs)
    );
    this.securityVulSummary$ = this._store.pipe(
      select(selectSecurityVulSummary)
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
      new GetSecurityMostAffectedAgents({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityAlertsSeverity({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityMostCommonCVEs({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityMostCommonCWEs({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetSecurityVulSummary({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }
}
