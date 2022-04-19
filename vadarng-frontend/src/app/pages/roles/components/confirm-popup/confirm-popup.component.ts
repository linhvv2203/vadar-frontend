import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "vadar-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.less"]
})
export class ConfirmPopupComponent implements OnInit {
  @Input()
  isVisible: boolean;

  @Input()
  isAdd: boolean;

  @Output()
  isVisibleChange = new EventEmitter();

  @Output()
  callback = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.callback.emit(false);
  }

  handleOk(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.callback.emit(true);
  }
}
