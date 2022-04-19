import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IAppState } from "src/app/redux/app.state";
import { Store } from "@ngrx/store";
import { Filter } from "src/app/redux/events";

@Component({
  selector: "vadar-event-top",
  templateUrl: "./event-top.component.html",
  styleUrls: ["./event-top.component.less"]
})
export class EventTopComponent implements OnInit {
  validateForm: FormGroup;

  @Input()
  redirect: string;

  constructor(private fb: FormBuilder, private _store: Store<IAppState>) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      url: [null]
    });
  }

  submitForm(): void {
    const { value } = this.validateForm;
    this._store.dispatch(new Filter(value.url)); // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
  }
}
