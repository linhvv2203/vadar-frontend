import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { Get, select as selectLogsSecurity } from "src/app/redux/logs-security";
@Component({
  selector: "vadar-grf-security-graph1",
  templateUrl: "./grf-security-graph1.component.html",
  styleUrls: ["./grf-security-graph1.component.less"]
})
export class GrfSecurityGraph1Component {
  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  model$: Observable<object>;
  workspaceSelected$: Observable<any>;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService
  ) {
    this.model$ = this._store.pipe(select(selectLogsSecurity));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filter) return;
    const { currentValue } = changes.filter;
    if (!currentValue.workSpaceId) return;
    this._store.dispatch(new Get(this.filter));
  }
}
