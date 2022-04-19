import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Get, IWorkspacePagingRequest } from "src/app/redux/workspaces";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";

@Component({
  selector: "saf-workspaces",
  templateUrl: "./workspaces.component.html",
  styleUrls: ["./workspaces.component.less"]
})
export class WorkspacesComponent implements OnInit {
  validateForm: FormGroup;
  isVisibleUploadScanner: boolean;
  isErrorVisibleUploadScanner: boolean;
  isCongratulations: boolean;
  isCreate: boolean = true;
  isUpdate: boolean = false;
  curentWP: any;
  workspacePagingRequest: IWorkspacePagingRequest = {
    workspaceName: "",
    pageSize: 10,
    pageIndex: 1
  };

  constructor(private fb: FormBuilder, private _store: Store<IAppState>) {}

  onOpenFormCreate(): void {
    this.isCreate = true;
    this.isUpdate = false;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      workspaceName: [""]
    });
  }

  submitForm(): void {
    this.workspacePagingRequest = {
      ...this.workspacePagingRequest,
      ...this.validateForm.value
    };
    this._store.dispatch(new Get(this.workspacePagingRequest));
  }
}
