import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "vadar-action-edit-form",
  templateUrl: "./action-edit-form.component.html",
  styleUrls: ["./action-edit-form.component.less"]
})
export class ActionEditFormComponent implements OnInit {
  query: Params;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      hostname: [this.query.name],
      enable: [true],
      detail: [this.query.detail]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
