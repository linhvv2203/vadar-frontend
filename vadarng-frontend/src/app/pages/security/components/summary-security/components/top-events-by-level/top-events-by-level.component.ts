import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import {
  Get,
  select as selected
} from "src/app/redux/security-top-events-by-level";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
@Component({
  selector: "vadar-top-events-by-level",
  templateUrl: "./top-events-by-level.component.html",
  styleUrls: ["./top-events-by-level.component.less"]
})
export class TopEventsByLevelComponent implements OnInit {
  model$: Observable<any>;
  workspaceSelected$: Observable<any>;
  param: object = {};
  workSpaceId = null;

  @Input()
  time: any = [];

  @Input()
  type: any;

  constructor(private _store: Store<IAppState>, private _router: Router) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.workSpaceId = res.id;
      if (!this.time || !this.time.length) return;
      this.param = {
        fromDate: this.time[0].toJSON(),
        toDate: this.time[1].toJSON(),
        type: this.type
      };
      this._store.dispatch(
        new Get({
          ...this.param,
          workSpaceId: res.id
        })
      );
    });
    this.model$ = this._store.pipe(select(selected));
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes.time;
    if (!currentValue || !currentValue.length) return;
    this.param = {
      fromDate: currentValue[0].toJSON(),
      toDate: currentValue[1].toJSON(),
      type: this.type
    };
    this._store.dispatch(
      new Get({
        ...this.param,
        workSpaceId: this.workSpaceId
      })
    );
  }

  rederectEvents(evt, level, name) {
    this._router.navigate(["/security"], {
      queryParams: {
        tabIndex: 1,
        level: level,
        events: name
      }
    });
  }
}
