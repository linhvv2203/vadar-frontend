import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "vadar-notifications-top",
  templateUrl: "./notifications-top.component.html",
  styleUrls: ["./notifications-top.component.less"]
})
export class NotificationsTopComponent implements OnInit {
  @Input()
  redirect: string = "";

  constructor() {}

  ngOnInit() {}
}
