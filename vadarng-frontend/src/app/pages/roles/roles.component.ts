import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { GetAllWorkspaceRolesPaging } from "src/app/redux/workspaceRoles";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { select as selectAuth } from "src/app/redux/auth";
import { Observable } from "rxjs";
import { CommonService } from "src/app/services/common/common.service";
import { EnPermissions } from "src/app/enums/enums";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.less"]
})
export class RolesComponent implements OnInit {
  EnPermissions = EnPermissions;

  validateForm: FormGroup;
  isCreate = false;
  query: Params;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  currentWorkspaceId = 0;

  constructor(
    private fb: FormBuilder,
    private _store: Store<any>,
    private activatedRoute: ActivatedRoute,
    public _commonService: CommonService,
    private _router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
  }

  onOpenFormCreate(): void {
    this.isCreate = true;
  }

  ngOnInit() {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.WorkspacePermissionView,
              EnPermissions.WorkspacePermissionSetting
              // EnPermissions.AllNotificationView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
        }
      }
    });
    // --- end Role & Permssion

    this.validateForm = this.fb.group({
      name: [null]
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.currentWorkspaceId = res.id;
      }
    });

    if (
      this.query != null &&
      this.query.show != null &&
      this.query.show == "createPopup"
    ) {
      this.isCreate = true;
    }
  }

  submitForm(): void {
    this._store.dispatch(
      new GetAllWorkspaceRolesPaging({
        pageIndex: 1,
        pageSize: 10,
        workspaceId: Number(this.currentWorkspaceId),
        workspaceRoleName: this.validateForm.controls["name"].value
      })
    );
  }
}
