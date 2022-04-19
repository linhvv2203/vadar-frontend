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
import {
  Get,
  select as selectAlertLevelEvolution
} from "src/app/redux/security-alert-level-evolution";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-grf-security-graph2",
  templateUrl: "./grf-security-graph2.component.html",
  styleUrls: ["./grf-security-graph2.component.less"]
})
export class GrfSecurityGraph2Component {
  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  model$: Observable<object>;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService
  ) {
    this.model$ = this._store.pipe(select(selectAlertLevelEvolution));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filter) return;
    const { currentValue } = changes.filter;
    if (!currentValue.workSpaceId) return;
    this._store.dispatch(
      new Get({
        ...this.filter,
        searchLevel: true
      })
    );
  }
}
