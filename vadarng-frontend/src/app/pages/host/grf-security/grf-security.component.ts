import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-grf-security",
  templateUrl: "./grf-security.component.html",
  styleUrls: ["./grf-security.component.less"]
})
export class GrfSecurityComponent {
  filter: any = {
    sort: "desc",
    fromDate: new Date(new Date().getTime() - 24 * 60 * 60000).toJSON(),
    toDate: new Date().toJSON()
  };
  workspaceSelected$: Observable<any>;

  constructor(private _store: Store<IAppState>) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (!res) return;
      this.filter = {
        ...this.filter,
        workSpaceId: res.id
      };
    });
  }
}
