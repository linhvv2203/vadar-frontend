import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./callback-silent.component.html",
  styleUrls: ["./callback-silent.component.less"]
})
export class CallbackSilentComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /* The parent window hosts the Angular application */
    var parent = window.parent;
    /* Send the id_token information to the oidc message handler */
    var event = new CustomEvent("oidc-silent-renew-message", {
      detail: window.location
    });
    parent.dispatchEvent(event);
  }
}
