import { Component, OnInit } from "@angular/core";

@Component({
  selector: "vadar-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.less"]
})
export class FeedbackComponent implements OnInit {
  ggForm: string =
    "https://docs.google.com/forms/d/e/1FAIpQLSd7DC5X4-wgo9rF9zlDqnZvyAHxCGGo-7koHUI1z5i89Bt1tg/viewform?embedded=true";

  constructor() {}

  ngOnInit() {}
}
