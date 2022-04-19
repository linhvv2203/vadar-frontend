import { Component, OnInit, Input } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { IAppState } from "src/app/redux/app.state";
import { select as selectAuth } from "src/app/redux/auth";
import { selectShowLeftMenu } from "src/app/redux/left-menu";
import { EnPermissions } from "src/app/enums/enums";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common/common.service";
import { selectFirstActive } from "src/app/redux/first-active";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "vadar-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.less"]
})
export class LeftMenuComponent implements OnInit {
  EnPermissions = EnPermissions;
  auth$: Observable<object>;
  stateLeftMenu$: Observable<boolean>;
  isFirstClickHost$: Observable<boolean>;
  levelMenu = {
    permission: false,
    logs: false
  };

  @Input()
  transparent = false;

  constructor(
    private _store: Store<IAppState>,
    public _router: Router,
    public _commonService: CommonService
  ) {}

  ngOnInit() {
    this.isFirstClickHost$ = this._store.pipe(select(selectFirstActive));
    this.auth$ = this._store.pipe(select(selectAuth));
    this.stateLeftMenu$ = this._store.pipe(select(selectShowLeftMenu));
  }

  collapseSubMenu(name: string) {
    this.levelMenu[name] = !this.levelMenu[name];
  }
}
