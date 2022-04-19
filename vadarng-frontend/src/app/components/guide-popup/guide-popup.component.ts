import { Component, OnInit } from "@angular/core";

@Component({
  selector: "vadar-guide-popup",
  templateUrl: "./guide-popup.component.html",
  styleUrls: ["./guide-popup.component.less"]
})
export class GuidePopupComponent implements OnInit {
  isVisible = true;
  constructor() {}

  ngOnInit() {}

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
}
