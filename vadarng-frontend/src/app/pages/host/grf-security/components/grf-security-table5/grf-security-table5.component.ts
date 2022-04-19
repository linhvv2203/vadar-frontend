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
import { Get, select as selectLogsSecurity } from "src/app/redux/logs-security";
import { Router } from "@angular/router";

@Component({
  selector: "vadar-grf-security-table5",
  templateUrl: "./grf-security-table5.component.html",
  styleUrls: ["./grf-security-table5.component.less"]
})
export class GrfSecurityTable5Component {
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
    this.model$ = this._store.pipe(select(selectLogsSecurity));
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
