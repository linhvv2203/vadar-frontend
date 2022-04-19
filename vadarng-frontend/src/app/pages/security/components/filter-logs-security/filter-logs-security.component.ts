import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { Get } from "src/app/redux/logs-security";
import { Get as GetGroupBy } from "src/app/redux/logs-security-group-by";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { SecurityLogDevices } from "src/app/enums/enums";
@Component({
  selector: "vadar-filter-logs-security",
  templateUrl: "./filter-logs-security.component.html",
  styleUrls: ["./filter-logs-security.component.less"]
})
export class FilterLogsSecurityComponent implements OnInit, OnChanges {
  validateForm: FormGroup;
  startValue: Date | null = new Date();
  endValue: Date | null = new Date();
  SecurityLogDevices = SecurityLogDevices;

  @Input()
  filter: any = {};

  @Input()
  tabIndex: any = {};

  @Input()
  time = [];

  @Output()
  filterChange = new EventEmitter();

  @Output()
  timeChange = new EventEmitter();

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private fb: FormBuilder,
    private _store: Store<IAppState>,
    private _route: ActivatedRoute
  ) {
    this.validateForm = this.fb.group({
      eventGroup: [""],
      eventName: [""],
      level: ["", [Validators.pattern("^[0-9]*$")]],
      hostName: [""],
      devices: [""]
    });
  }

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this._route.queryParams.subscribe((params: Params) => {
          if (this.tabIndex === 1) {
            this.validateForm.controls["eventName"].setValue(
              decodeURI(params.events || "")
            );
            this.validateForm.controls["level"].setValue(params.level);
          }
          const { time = [] } = params;
          if (time[0] && time[1]) {
            this.timeChange.emit([new Date(time[0]), new Date(time[1])]);
          }
        });
        this.get();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.time) return;
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.startValue = currentValue[0];
    this.endValue = currentValue[1];
    if (this.workspaceId) this.get();
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.get();
  }

  get() {
    const { value } = this.validateForm;
    this.filter = {
      ...this.filter,
      ...value,
      fromDate: this.startValue,
      toDate: this.endValue,
      workspaceId: Number(this.workspaceId)
    };
    this.filterChange.emit(this.filter);
    if (this.tabIndex === 1) {
      this._store.dispatch(new Get(this.filter));
    } else if (this.tabIndex === 2) {
      this._store.dispatch(new GetGroupBy(this.filter));
    }
  }
}
