import { Component, OnInit } from "@angular/core";

@Component({
  selector: "vadar-host-edit",
  templateUrl: "./host-edit.component.html",
  styleUrls: ["./host-edit.component.less"]
})
export class HostEditComponent implements OnInit {
  isCreate: boolean = false;

  constructor() {}

  ngOnInit() {}
}
