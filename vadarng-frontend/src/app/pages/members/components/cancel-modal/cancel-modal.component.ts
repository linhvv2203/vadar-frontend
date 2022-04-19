import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "vadar-cancel-modal",
  templateUrl: "./cancel-modal.component.html",
  styleUrls: ["./cancel-modal.component.less"]
})
export class CancelModalComponent implements OnInit {
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
