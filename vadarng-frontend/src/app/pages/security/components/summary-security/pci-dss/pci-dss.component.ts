import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  select as selectTopRequirementsOverTime,
  Get as GetTopRequirementsOverTime
} from "src/app/redux/security-top-requirements-over-time";
import {
  select as selectTopAgentsByAlerts,
  Get as GetTopAgentsByAlerts
} from "src/app/redux/security-top-agents-by-alerts";
import {
  select as selectPCIDSSReq,
  Get as GetTPCIDSSReq
} from "src/app/redux/security-requirements-pci-dss";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-pci-dss",
  templateUrl: "./pci-dss.component.html",
  styleUrls: ["./pci-dss.component.less"]
})
export class PciDssComponent implements OnInit {
  topRequirementsOverTime$: Observable<any>;
  topAgentsByAlerts$: Observable<any>;
  workspaceSelected$: Observable<any>;
  pciDssReq$: Observable<any>;
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
        new GetTopRequirementsOverTime({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetTopAgentsByAlerts({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
      this._store.dispatch(
        new GetTPCIDSSReq({
          ...this.param,
          workSpaceId: this.workSpaceId
        })
      );
    });
    this.topRequirementsOverTime$ = this._store.pipe(
      select(selectTopRequirementsOverTime)
    );
    this.topAgentsByAlerts$ = this._store.pipe(select(selectTopAgentsByAlerts));
    this.pciDssReq$ = this._store.pipe(select(selectPCIDSSReq));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.param = {
      fromDate: currentValue[0],
      toDate: currentValue[1]
    };
    this._store.dispatch(
      new GetTopRequirementsOverTime({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetTopAgentsByAlerts({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
    this._store.dispatch(
      new GetTPCIDSSReq({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }
  ngOnInit() {}
}
