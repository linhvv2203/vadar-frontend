import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
import {
  GetDetailTicket,
  UpdateTicket,
  selectDetailTicket
} from "src/app/redux/logs-ticket";
import { NotificationService } from "src/app/services/notifications";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { valueToRelative } from "@amcharts/amcharts4/.internal/core/utils/Utils";

export enum EnTicketStatus {
  Open = "Open",
  Resolved = "Resolved"
}

export enum EnImpactStatus {
  WithImpact = "WithImpact",
  NoImpact = "NoImpact",
  NotApplicable = "NotApplicable"
}

export enum EnResolutionStatus {
  Indeterminate = "Indeterminate",
  TruePositive = "TruePositive",
  FalsePositive = "FalsePositive",
  Other = "Other"
}
@Component({
  selector: "vadar-popup-detail-ticket",
  templateUrl: "./popup-detail-ticket.component.html",
  styleUrls: ["./popup-detail-ticket.component.less"]
})
export class PopupDetailTicketComponent implements OnChanges {
  @Input()
  dataSelected: any;

  @Input()
  isPopupDetail: boolean;

  @Output()
  statusChange = new EventEmitter();

  @Output()
  isPopupDetailChange = new EventEmitter();

  detailTicket$: Observable<any>;
  workspaceSelected$: Observable<any>;
  workspaceSelected = null;
  enTicketStatus = EnTicketStatus;
  isReOpenVisible: boolean;
  isCloseVisible: boolean;
  validateForm: FormGroup;
  isEdit = false;
  nzFilterOption = () => true;
  listOfAssignTo: Array<{ label: string; value: string }> = [
    {
      value: "tier1",
      label: "TICKET.TIER1"
    },
    {
      value: "tier2",
      label: "TICKET.TIER2"
    },
    {
      value: "tier3",
      label: "TICKET.TIER3"
    },
    {
      value: "customer",
      label: "TICKET.CUSTOMER_CLUE"
    }
  ];

  constructor(
    private _fb: FormBuilder,
    public _commonService: CommonService,
    private _store: Store<IAppState>,
    private _notificationService: NotificationService
  ) {
    this.isReOpenVisible = false;
    this.isCloseVisible = false;
    this.validateForm = this._fb.group({
      title: [null, [Validators.required]],
      severity: [null, [Validators.required]],
      assignee: [
        {
          value: null,
          disabled: true
        },
        [Validators.required]
      ],
      assignTo: [null],
      startDate: [null, [Validators.required]],
      tags: [null],
      description: [null, [Validators.required]],
      hostName: [null],
      eventTime: [null]
    });
    this.detailTicket$ = this._store.pipe(select(selectDetailTicket));
    this.detailTicket$.subscribe(res => {
      if (res.isInit) return;
      this.validateForm.patchValue(res);
      if (res.status !== EnTicketStatus.Resolved)
        this.validateForm.removeControl("endDate");
      else
        this.validateForm.addControl(
          "endDate",
          new FormControl(res.endDate, Validators.required)
        );
    });
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.workspaceSelected = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.dataSelected) return;
    const { currentValue } = changes.dataSelected;
    if (!currentValue) return;
    this.get();
  }

  get(): void {
    this.dataSelected._id &&
      this._store.dispatch(
        new GetDetailTicket({
          index: "v1/query",
          query: {
            query: [
              { _name: "getCase", idOrName: this.dataSelected._id },
              {
                _name: "page",
                from: 0,
                to: 1,
                extraData: [
                  "observableStats",
                  "taskStats",
                  "alerts",
                  "isOwner",
                  "shareCount",
                  "permissions"
                ]
              }
            ]
          },
          organisation: this.workspaceSelected.name,
          method: "POST"
        })
      );
  }

  showReOpenConfirm(): void {
    this.isReOpenVisible = true;
  }

  showCloseConfirm(): void {
    this.isCloseVisible = true;
  }

  showEdit(): void {
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.isEdit = false;
  }

  close(): void {
    this.isPopupDetail = false;
    this.isPopupDetailChange.emit(this.isPopupDetail);
  }

  updateTicket(query: any): void {
    this._store.dispatch(
      new UpdateTicket(
        {
          index: `case/${this.dataSelected._id}`,
          query,
          organisation: this.workspaceSelected.name,
          method: "PATCH"
        },
        res => {
          if (!res.isSuccessStatusCode) return;
          this.updateSuccessFully();
          this.cancelEdit();
        }
      )
    );
  }

  updateSuccessFully(): void {
    this._notificationService.success(
      this._commonService.translateText("WORKSPACES.SUCCESS")
    );
    this.get();
    setTimeout(() => {
      this.statusChange.emit();
    }, 100);
    // this.close();
  }

  submitForm(): void {
    if (!this.isEdit) return;
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const { value } = this.validateForm;
    valueToRelative;
    this.updateTicket({
      ...value,
      startDate: new Date(value.startDate).getTime(),
      endDate: new Date(value.endDate).getTime()
    });
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.updateTicket({
      status: EnTicketStatus.Open
    });
  }

  handleCloseCallBackModal(res: any): void {
    if (!res) return;
    this.updateTicket({
      customFields: {},
      impactStatus: "NotApplicable",
      status: "Resolved",
      ...res
    });
  }
}
