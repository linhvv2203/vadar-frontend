import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-edit-roles",
  templateUrl: "./edit-roles.component.html",
  styleUrls: ["./edit-roles.component.less"]
})
export class EditRolesComponent implements OnInit {
  validateForm: FormGroup;
  isCreate: boolean = false;
  isWorkspaceSelected: any;

  workspaceSelected$: Observable<any>;
  constructor(private fb: FormBuilder, private _store: Store<any>) {}

  onOpenFormCreate(): void {
    this.isCreate = true;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      url: [null]
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.isWorkspaceSelected = res.id;
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
