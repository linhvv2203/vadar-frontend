import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { GroupOfSecurity } from "src/app/enums/enums";

@Component({
  selector: "vadar-summary-security",
  templateUrl: "./summary-security.component.html",
  styleUrls: ["./summary-security.component.less"]
})
export class SummarySecurityComponent implements OnInit {
  GroupOfSecurity = GroupOfSecurity;
  @Input()
  time: object = [];

  groupId: number = 0;

  constructor(private _route: ActivatedRoute) {
    this._route.queryParams.subscribe((params: Params) => {
      this.groupId = Number(params.groupId || 0);
    });
  }

  ngOnInit() {}
}
