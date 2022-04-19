import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "vadar-top-tickets",
  templateUrl: "./top-tickets.component.html",
  styleUrls: ["./top-tickets.component.less"]
})
export class TopTicketsComponent implements OnInit {
  @Input()
  redirect: string = "";

  constructor() {}

  ngOnInit() {}
}
