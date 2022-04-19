import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { NzTableComponent } from "ng-zorro-antd";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { CommonService } from "src/app/services/common/common.service";
import { Get } from "src/app/redux/logs-security-group-by";
import { select as selected } from "src/app/redux/logs-security-group-by";
import { Router } from "@angular/router";

@Component({
  selector: "vadar-grf-security-table3",
  templateUrl: "./grf-security-table3.component.html",
  styleUrls: ["./grf-security-table3.component.less"]
})
export class GrfSecurityTable3Component {
  pageSize = 500;

  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  model$: Observable<object>;

  @ViewChild("rowSelectionTable", { static: false })
  nzTableComponent: NzTableComponent;

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router
  ) {
    this.model$ = this._store.pipe(select(selected));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filter) return;
    const { currentValue } = changes.filter;
    if (!currentValue.workSpaceId) return;
    this._store.dispatch(
      new Get({
        ...this.filter
      })
    );
  }

  redirectEvents(evt, level, name) {
    this._router.navigate(["/security"], {
      queryParams: {
        tabIndex: 1,
        level: level,
        events: name
      }
    });
  }
}
