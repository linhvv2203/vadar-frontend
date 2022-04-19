import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import {
  select as selectWorkspaces,
  Get,
  IWorkspacePagingRequest,
  Delete,
  DeleteByListId,
  Organisation,
  selectedWorkspacesHeader
} from "src/app/redux/workspaces";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";
import { Params, Router } from "@angular/router";
import { ExpireStatus } from "src/app/enums/enums";
import { GetMembersByWorkspace } from "src/app/redux/members";
interface ItemData {
  id: number;
  name: string;
  count: number;
}
@Component({
  selector: "saf-table-workspaces",
  templateUrl: "./table-workspaces.component.html",
  styleUrls: ["./table-workspaces.component.less"]
})
export class TableWorkspacesComponent implements OnInit {
  params: Params;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  model$: Observable<object>;
  currentPageIndex = 1;
  ExpireStatus = ExpireStatus;

  @Input()
  data: IWorkspacePagingRequest;

  @Input()
  curentWP: any;

  @Output()
  curentWPChange = new EventEmitter();

  @Input()
  isCreate: boolean;

  @Output()
  isCreateChange = new EventEmitter();

  @Input()
  isUpdate: boolean;

  @Output()
  isUpdateChange = new EventEmitter();

  isVisible: boolean;
  idWorkspace: any;
  isMulti: boolean;
  workspaceSelected$: Observable<any>;

  constructor(
    private _store: Store<IAppState>,
    private _notificationService: NotificationService,
    private _router: Router,
    private _commonService: CommonService
  ) {
    this.isVisible = false;
    this.isMulti = false;
  }

  ngOnInit(): void {
    this.model$ = this._store.pipe(select(selectWorkspaces));
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.getWorkspacePaging(this.data);
  }

  getWorkspacePaging(param: IWorkspacePagingRequest) {
    this._store.dispatch(new Get(param));
  }

  currentPageDataChange($event: ItemData[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.id]
    );

    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );

    this.refreshStatus();
  }

  onPageChange(event): void {
    this.currentPageIndex = event;
    this.getWorkspacePaging({
      ...this.data,
      pageIndex: this.currentPageIndex
    });
  }

  handleEdit(data?: any) {
    this.curentWPChange.emit(data);
    this.isCreateChange.emit(true);
    this.isUpdateChange.emit(true);
  }

  handleGoToWorkspace(value: any) {
    const params = { ...this.params };
    delete params.params;
    this._router.navigate([window.location.pathname], {
      queryParams: { ...params, wp_id: value.id }
    });
  }

  delete(workspaceId: number) {
    this._store.dispatch(
      new Delete({ workspaceId: workspaceId }, res => {
        if (res) {
          this.getWorkspacePaging(this.data);
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  deleteByListId(workspaceIds: string[]) {
    this._store.dispatch(
      new DeleteByListId({ workspaceIds }, res => {
        if (res) {
          this.getWorkspacePaging(this.data);
          this._notificationService.success(
            this._commonService.translateText("WORKSPACES.SUCCESS")
          );
        }
      })
    );
  }

  showConfirm(data?: any): void {
    if (!data) {
      this.isMulti = true;
      this.idWorkspace = [];
      for (let key in this.mapOfCheckedId) {
        if (
          this.mapOfCheckedId.hasOwnProperty(key) &&
          this.mapOfCheckedId[key]
        ) {
          this.idWorkspace.push(Number(key));
        }
      }
      if (this.idWorkspace.length) this.isVisible = true;
    } else {
      this.isMulti = false;
      this.idWorkspace = data;
      this.isVisible = true;
    }
  }

  handleCallBackModal(res: any): void {
    if (!res) return;
    this.isMulti
      ? this.deleteByListId(this.idWorkspace)
      : this.delete(this.idWorkspace);
  }

  handleCreateOrganisation(data: any): void {
    if (data.isCreatedOrganisation) return;
    this._store.dispatch(
      new Organisation(
        {
          method: "POST",
          index: "login",
          useCookie: true,
          query: {}
        },
        (res: any) => {
          if (!res.isSuccessStatusCode) return;
          // create organisation
          this._store.dispatch(
            new Organisation(
              {
                method: "POST",
                index: "organisation",
                useCookie: true,
                workspaceId: data.id,
                query: {
                  name: data.name,
                  description: data.name
                }
              },
              ress => {
                if (!ress.isSuccessStatusCode) return;
                this.getWorkspacePaging(this.data);
                this._store.dispatch(
                  new GetMembersByWorkspace(
                    {
                      workspaceId: Number(data.id)
                    },
                    res => {
                      const memb = [...res];
                      // add list user to organisation
                      this._store.dispatch(
                        new Organisation(
                          ...this._commonService.settingParamsForAddUser(
                            "tickets@vsec.com.vn",
                            "VSEC VADAR",
                            data.name,
                            "org-admin"
                          ),
                          resss => {
                            if (!resss.isSuccessStatusCode) return;
                            this._notificationService.success(
                              this._commonService.translateText(
                                "WORKSPACES.SUCCESS"
                              )
                            );
                          }
                        )
                      );
                      memb.forEach(elm => {
                        if (elm.inviteStatus) {
                          this._store.dispatch(
                            new Organisation(
                              ...this._commonService.settingParamsForAddUser(
                                elm.userEmail,
                                elm.userEmail,
                                data.name
                              )
                            )
                          );
                        }
                      });
                    }
                  )
                );
              }
            )
          );
        }
      )
    );
  }
}
