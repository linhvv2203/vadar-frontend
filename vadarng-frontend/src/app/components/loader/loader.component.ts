import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { IAppState } from "src/app/redux/app.state";
import { select as selectLoading } from "src/app/redux/loader";

@Component({
  selector: "vadar-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.less"]
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this.loading$ = this._store.pipe(select(selectLoading));
  }
}
