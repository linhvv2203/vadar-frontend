import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Update } from "src/app/redux/host";
import { selectGetGroupPaging } from "src/app/redux/group";
import { NotificationService } from "src/app/services/notifications";
import { Get } from "src/app/redux/summary/actions";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { Observable } from "rxjs";
import { EnPermissions, SecurityLogDevices } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-host-edit-form",
  templateUrl: "./host-edit-form.component.html",
  styleUrls: ["./host-edit-form.component.less"]
})
export class HostEditFormComponent implements OnInit {
  EnPermissions = EnPermissions;
  query: Params;
  validateForm: FormGroup;
  grafanaInventoryDashboardUrl: string;
  grafanaSecurityDashboardtUrl: string;
  grafanaPerformanceDashboardtUrl: string;
  SecurityLogDevices = SecurityLogDevices;

  @Input()
  auth$: Observable<object>;

  listOfOption$: Observable<object>;
  listOfSelectedValue: string[] = [];

  workspaceSelected$: Observable<any>;
  workspaceId = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _store: Store<any>,
    private _notificationService: NotificationService,
    public _commonService: CommonService,
    private _router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null],
      groups: [null],
      type: [SecurityLogDevices.workstations]
    });
    this.auth$ = this._store.pipe(select(selectAuth));
    this.listOfOption$ = this._store.pipe(select(selectGetGroupPaging));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;

        this.grafanaInventoryDashboardUrl = this._commonService.getGrafanaInventory(
          res,
          this.query.nameEngine
        );

        this.grafanaPerformanceDashboardtUrl = this._commonService.getGrafanaPerformance(
          res,
          this.query.nameEngine
        );

        this.grafanaSecurityDashboardtUrl = this._commonService.getGrafanaSecurity(
          res,
          this.query.nameEngine
        );
      }
    });

    this.validateForm.controls["name"].setValue(
      this.query.name || this.query.nameEngine
    );
    this.validateForm.controls["type"].setValue(Number(this.query.type));
    this.listOfSelectedValue = this.query.groupId.split(",");
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const dataSend = {
      ...this.validateForm.value,
      ...{ workspaceId: Number(this.workspaceId) },
      ...{ id: this.query.id }
    };

    this._store.dispatch(
      new Update(dataSend, res => {
        if (res) {
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
          this._store.dispatch(new Get(Number(this.workspaceId)));
          this._router.navigate(["/host"], {
            queryParams: {}
          });
        }
      })
    );
  }
}
