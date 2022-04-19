import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { Get, ILogsTicketRequest } from "src/app/redux/logs-ticket";
import { EnTicketStatus } from "src/app/pages/ticket/components/popup-detail-ticket/popup-detail-ticket.component";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-filter-tickets",
  templateUrl: "./filter-tickets.component.html",
  styleUrls: ["./filter-tickets.component.less"]
})
export class FilterTicketsComponent implements OnInit {
  validateForm: FormGroup;
  startValue: Date | null = new Date();
  endValue: Date | null = new Date();
  workspaceSelected$: Observable<any>;
  workspaceId = null;
  enTicketStatus = [];

  @Input()
  filter: ILogsTicketRequest = {};

  @Output()
  filterChange = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _commonService: CommonService
  ) {
    this.startValue = new Date();
    this.startValue.setDate(this.startValue.getDate() - 1);
    this.enTicketStatus = this._commonService.toArray(EnTicketStatus);
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      gte: [""],
      lte: [""],
      title: [""],
      owner: [""],
      status: [""]
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

  get() {
    const { value } = this.validateForm;
    this.filter = {
      owner: value.owner,
      query: {
        ...value,
        gte: this.startValue,
        lte: this.endValue
      },
      workspaceId: Number(this.workspaceId)
    };
    this.filterChange.emit(this.filter);
    this._store.dispatch(new Get(this.filter));
  }

  submitForm(): void {
    this.get();
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
}
