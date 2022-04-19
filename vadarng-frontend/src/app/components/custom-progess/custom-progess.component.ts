import { Component, OnInit } from "@angular/core";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "vadar-custom-progess",
  templateUrl: "./custom-progess.component.html",
  styleUrls: ["./custom-progess.component.less"]
})
export class CustomProgressComponent implements OnInit {
  intervalProgress = null;
  percent: number;
  successPercent: number;

  constructor() {}

  ngOnInit() {
    this.percent = 60;
    this.successPercent = 0;

    if (!this.intervalProgress) {
      this.intervalProgress = setInterval(() => {
        this.percent += 2;
        if (this.percent > 60) {
          this.successPercent += 2;
        }
        if (this.successPercent > 100) {
          this.percent = 0;
          this.successPercent = 0;
        }
      }, 20);
    }
  }
}
