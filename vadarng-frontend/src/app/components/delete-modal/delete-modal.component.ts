import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "vadar-delete-modal",
  templateUrl: "./delete-modal.component.html",
  styleUrls: ["./delete-modal.component.less"]
})
export class DeleteModalComponent implements OnInit {
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
