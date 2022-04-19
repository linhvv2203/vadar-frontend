import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  EnResolutionStatus,
  EnImpactStatus
} from "src/app/pages/ticket/components/popup-detail-ticket/popup-detail-ticket.component";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-popup-confirm-close-modal-ticket",
  templateUrl: "./popup-confirm-close-modal-ticket.component.html",
  styleUrls: ["./popup-confirm-close-modal-ticket.component.less"]
})
export class PopupConfirmCloseModalTicketComponent implements OnInit {
  @Input()
  isVisible: boolean = false;

  @Input()
  id: any = "";

  @Output()
  isVisibleChange = new EventEmitter();

  @Output()
  callback = new EventEmitter();

  validateForm: FormGroup;
  enResolutionStatus = [];
  EnResolutionStatus = EnResolutionStatus;

  constructor(private _fb: FormBuilder, private _commonService: CommonService) {
    this.enResolutionStatus = this._commonService.toArray(EnResolutionStatus);
  }

  ngOnInit() {
    this.validateForm = this._fb.group({
      resolutionStatus: ["Indeterminate", [Validators.required]],
      summary: ["", [Validators.required]]
    });
  }

  handleOk(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const { value } = this.validateForm;
    this.callback.emit(value);
    this.close();
  }

  open(): void {
    this.isVisible = true;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleCancel(): void {
    this.callback.emit(false);
    this.close();
  }

  handleChangeRsStatus(value: string): void {
    if (value === EnResolutionStatus.TruePositive)
      this.validateForm.addControl(
        "impactStatus",
        new FormControl(EnImpactStatus.WithImpact, Validators.required)
      );
    else this.validateForm.removeControl("impactStatus");
  }

  close(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
