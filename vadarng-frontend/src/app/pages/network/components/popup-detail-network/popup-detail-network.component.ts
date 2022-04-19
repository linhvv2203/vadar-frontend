import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "vadar-popup-detail-network",
  templateUrl: "./popup-detail-network.component.html",
  styleUrls: ["./popup-detail-network.component.less"]
})
export class PopupDetailNetworkComponent implements OnInit {
  @Input()
  dataSelected: any;

  @Input()
  isPopupDetail: boolean;

  @Output()
  isPopupDetailChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  close(): void {
    this.isPopupDetail = false;
    this.isPopupDetailChange.emit(this.isPopupDetail);
  }
}
