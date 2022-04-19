import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { Get, selectLogsTicket } from "src/app/redux/logs-ticket";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-table-tickets",
  templateUrl: "./table-tickets.component.html",
  styleUrls: ["./table-tickets.component.less"]
})
export class TableTicketsComponent implements OnInit {
  currentPageIndex = 1;
  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;
  isPopupDetail = false;
  dataSelected = [];

  @Input()
  filter: any = {};

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.initDataByWorkspaceId();
      }
    });
  }

  initDataByWorkspaceId() {
    this.model$ = this._store.pipe(select(selectLogsTicket));
  }

  onPageChange(event = 1): void {
    this.currentPageIndex = event;
    this._store.dispatch(
      new Get({
        workspaceId: this.workspaceId,
        ...this.filter,
        query: {
          ...this.filter.query,
          pageIndex: this.currentPageIndex
        }
      })
    );
  }

  onSelect(data): void {
    this.dataSelected = data;
    this.isPopupDetail = true;
  }
}
