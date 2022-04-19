import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { IAppState } from "src/app/redux/app.state";
import { ChangeLanguage } from "src/app/redux/setting";
import { selectSetting } from "src/app/redux/setting/selectors";
import { NotificationService } from "src/app/services/notifications";

@Component({
  selector: "vadar-select-lang",
  templateUrl: "./select-lang.component.html",
  styleUrls: ["./select-lang.component.less"]
})
export class SelectLangComponent implements OnInit {
  visible: boolean;
  language$: Observable<object>;

  constructor(
    private _store: Store<IAppState>,
    private _noticeSer: NotificationService
  ) {}

  ngOnInit() {
    this.language$ = this._store.pipe(select(selectSetting));
  }

  handleChangeLang(lang) {
    this._store.dispatch(new ChangeLanguage({ lang }));
    this.visible = false;
    this._noticeSer.changeLanguage(lang === "vn" ? "vi" : "en-US");
  }
}
