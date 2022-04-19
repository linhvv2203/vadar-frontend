import {
  Component,
  OnInit,
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
import { GetSelectGrfSecurity4, selectgrfSecurity4 } from "src/app/redux/host";
@Component({
  selector: "vadar-grf-security-table4",
  templateUrl: "./grf-security-table4.component.html",
  styleUrls: ["./grf-security-table4.component.less"]
})
export class GrfSecurityTable4Component implements OnInit {
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
    public _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.model$ = this._store.pipe(select(selectgrfSecurity4));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.filter) return;
    const { currentValue } = changes.filter;
    if (!currentValue.workSpaceId) return;
    this._store.dispatch(new GetSelectGrfSecurity4({ ...this.filter }));
  }
}
