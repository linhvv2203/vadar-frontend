import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "vadar-popup-confirm-add-condition",
  templateUrl: "./popup-confirm-add-condition.component.html",
  styleUrls: ["./popup-confirm-add-condition.component.less"]
})
export class PopupConfirmAddConditionComponent implements OnInit {
  isAccept: boolean = true;

  @Input()
  isConfirmPopup: boolean;

  @Output()
  isConfirmPopupChange = new EventEmitter();

  @Output() isAcceptChangeConditon = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  handleCancel(): void {
    this.close();
  }

  close(): void {
    this.isConfirmPopup = false;
    this.isConfirmPopupChange.emit(this.isConfirmPopup);
  }

  acceptChangeCondition() {
    this.isAcceptChangeConditon.emit(this.isAccept);
    this.close();
  }
}
