import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-ticket-popup-warning",
  templateUrl: "./ticket-popup-warning.component.html",
  styleUrls: ["./ticket-popup-warning.component.less"]
})
export class TicketPopupWarningComponent implements OnInit {
  @Input()
  isVisible = true;

  @Output()
  isVisibleChange = new EventEmitter();

  constructor(private _commonService: CommonService) {}

  ngOnInit() {}

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
