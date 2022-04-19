import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "vadar-popup-confirm-modal-ticket",
  templateUrl: "./popup-confirm-modal-ticket.component.html",
  styleUrls: ["./popup-confirm-modal-ticket.component.less"]
})
export class PopupConfirmModalTicketComponent implements OnInit {
  @Input()
  isVisible: boolean = false;

  @Input()
  id: any = "";

  @Output()
  isVisibleChange = new EventEmitter();

  @Output()
  callback = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOk(): void {
    this.callback.emit(this.id);
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

  close(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
