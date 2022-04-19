import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "vadar-ds-top-attack-ip",
  templateUrl: "./ds-top-attack-ip.component.html",
  styleUrls: ["./ds-top-attack-ip.component.less"]
})
export class DsTopAttackIpComponent implements OnInit {
  @Input()
  data: any;

  constructor() {}

  ngOnInit() {}
}
