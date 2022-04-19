import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Get } from "src/app/redux/logs-network";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-filter-logs-network",
  templateUrl: "./filter-logs-network.component.html",
  styleUrls: ["./filter-logs-network.component.less"]
})
export class FilterLogsNetworkComponent implements OnInit {
  validateForm: FormGroup;
  startValue: Date | null = new Date();
  endValue: Date | null = new Date();

  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  hostQueryConditions: any = {};

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(private fb: FormBuilder, private _store: Store<IAppState>) {
    this.startValue = new Date();
    this.startValue.setDate(this.startValue.getDate() - 1);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      fromDate: [""],
      toDate: [""],
      hostName: [""],
      sourceAddress: [""],
      destinationAddress: [""]
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
