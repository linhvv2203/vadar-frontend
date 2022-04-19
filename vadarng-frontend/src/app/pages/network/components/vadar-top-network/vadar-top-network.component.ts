import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "vadar-top-network",
  templateUrl: "./vadar-top-network.component.html",
  styleUrls: ["./vadar-top-network.component.less"]
})
export class VadarTopNetworkComponent implements OnInit {
  @Input()
  redirect: string = "";

  constructor() {}

  ngOnInit() {}
}
