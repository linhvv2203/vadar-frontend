import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Get, IHostQueryConditions } from "src/app/redux/logs-performance";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "vadar-filter-logs-performance",
  templateUrl: "./filter-logs-performance.component.html",
  styleUrls: ["./filter-logs-performance.component.less"]
})
export class FilterLogsPerformanceComponent implements OnInit {
  validateForm: FormGroup;
  startValue: Date | null = new Date();
  endValue: Date | null = new Date();
  query: Params;

  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  hostQueryConditions: IHostQueryConditions = {};

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _store: Store<IAppState>
  ) {
    this.startValue = new Date();
    this.startValue.setDate(this.startValue.getDate() - 1);
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      fromDate: [""],
      toDate: [""],
      status: [null],
      severity: [null]
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params && params.status) {
        this.validateForm.controls["status"].setValue(params.status);
      }
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.get();
      }
    });
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  submitForm(): void {
    this.get();
  }

  get() {
    const { value } = this.validateForm;
    this.filter = {
      ...value,
      fromDate: this.startValue,
      toDate: this.endValue,
      workspaceId: Number(this.workspaceId)
    };
    this.filterChange.emit(this.filter);
    this._store.dispatch(new Get(this.filter));
  }
}
