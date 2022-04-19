import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import {
  selectedWorkspacesHeader,
  selectDetail as selectOrganisation
} from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { CreatTicket, selectCaseTemplate } from "src/app/redux/logs-security";
import { selectMembersByWorkspace } from "src/app/redux/members";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotificationService } from "src/app/services/notifications";
import { select as selectAuth } from "src/app/redux/auth";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "vadar-popup-detail-security",
  templateUrl: "./popup-detail-security.component.html",
  styleUrls: ["./popup-detail-security.component.less"]
})
export class PopupDetailSecurityComponent implements OnInit, OnChanges {
  grafanaSecurityDashboardtUrl: any;
  member$: Observable<any>;
  caseTemplate$: Observable<any>;
  workspaceSelected$: Observable<any>;
  organisation$: Observable<any>;
  auth$: Observable<any>;
  auth: any;
  validateForm: FormGroup;
  query: {
    title: string;
    description: string;
    pap?: number;
    severity?: number;
    startDate?: any;
    status: string;
    tags?: any;
    tlp?: number;
    hostName?: string;
    eventTime?: string;
  };
  isCreatedOrganisation = false;
  isTicketWarning = false;
  isTemplateOpen: boolean;
  wp: any = {};

  @Input()
  dataSelected: any;

  @Input()
  isPopupDetail: boolean;

  rawLogs: string;
  @Output()
  isPopupDetailChange = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    public _commonService: CommonService,
    private _store: Store<IAppState>,
    private message: NzMessageService,
    private notificationService: NotificationService
  ) {
    this.query = {
      title: "",
      description: "",
      status: "Open"
    };
    this.isTemplateOpen = false;
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      // memb: [],
      template: [""]
    });
    this.member$ = this._store.pipe(select(selectMembersByWorkspace));
    this.caseTemplate$ = this._store.pipe(select(selectCaseTemplate));
    this.organisation$ = this._store.pipe(select(selectOrganisation));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.organisation$.subscribe(res => {
      if (res) {
        this.isCreatedOrganisation = res.isCreatedOrganisation;
      }
    });
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.grafanaSecurityDashboardtUrl = this._commonService.getGrafanaSecurity(
          res,
          ""
        );
        this.wp = res;
        // this._store.dispatch(
        //   new GetMembersByWorkspace({
        //     workspaceId: Number(res.id)
        //   })
        // );
      }
    });
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe(res => {
      this.auth = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.dataSelected) return;
    const { currentValue } = changes.dataSelected;
    if (!currentValue) return;
    this.query = {
      ...this.query,
      title: this.dataSelected.description,
      hostName: this.dataSelected.host,
      eventTime: this.dataSelected.timestamp,
      description: this.dataSelected.fullLog || this.dataSelected.description,
      startDate: Date.now
    };
  }

  selectCaseTemplate(selected): void {
    if (selected !== "") {
      this.query = {
        ...this.query,
        pap: selected.pap,
        tags: selected.tags,
        severity: selected.severity,
        tlp: selected.tlp
      };
    } else {
      delete this.query.pap;
      delete this.query.tags;
      delete this.query.severity;
      delete this.query.tlp;
      this.query = {
        ...this.query
      };
    }
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    if (this.isCreatedOrganisation) {
      this._store.dispatch(
        new CreatTicket(
          {
            index: "case",
            organisation: this.wp.name,
            workspaceId: this.wp.id,
            owner: this.auth.email,
            query: {
              ...this.query,
              assignee: this.auth.email
            },
            method: "POST"
          },
          res => {
            if (res) {
              if (res.isSuccessStatusCode) {
                this.close();
                this.notificationService.success(
                  this._commonService.translateText("WORKSPACES.SUCCESS")
                );
              } else {
                this.close();
                this.notificationService.error(
                  this._commonService.translateText("WORKSPACES.ERROR")
                );
              }
            }
          }
        )
      );
    } else {
      this.isTicketWarning = true;
      this.isTemplateOpen = false;
    }
  }

  close(): void {
    this.isPopupDetail = false;
    this.isPopupDetailChange.emit(this.isPopupDetail);
    this.isTemplateOpen = false;
  }

  copy(): void {
    var copyText: any = document.querySelector("#metaTag");
    copyText.select();
    document.execCommand("copy", false, "dataSelected.rawLogs");
    this.message.create(
      "success",
      this._commonService.translateText("GLOBAL.COPIED")
    );
  }
}
