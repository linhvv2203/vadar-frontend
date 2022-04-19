import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "vadar-top-performance",
  templateUrl: "./top-performance.component.html",
  styleUrls: ["./top-performance.component.less"]
})
export class TopPerformanceComponent implements OnInit {
  @Input()
  redirect: string = "";

  constructor() {}

  ngOnInit() {}
}
