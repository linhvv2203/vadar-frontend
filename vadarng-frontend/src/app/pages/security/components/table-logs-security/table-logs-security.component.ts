import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";
import { NzModalRef } from "ng-zorro-antd";
import {
  Get,
  select as selectLogsSecurity,
  IHostQueryConditions,
  GetCaseTempalte
} from "src/app/redux/logs-security";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { ActivatedRoute, Params } from "@angular/router";
import { selectAll, selectedWorkspacesHeader } from "src/app/redux/workspaces";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  selector: "vadar-table-logs-security",
  templateUrl: "./table-logs-security.component.html",
  styleUrls: ["./table-logs-security.component.less"]
})
export class TableLogsSecurityComponent implements OnInit {
  confirmModal: NzModalRef;
  currentPageIndex = 1;
  hostQueryConditions: IHostQueryConditions = {
    eventGroup: "",
    eventName: "",
    hostName: ""
  };
  isPopupDetail = false;
  dataSelected = [];
  pageSize = 50;
  totalHits = {
    value: 0
  };

  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  model$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaces$: Observable<any>;
  workspaceId = null;

  constructor(
    private _store: Store<IAppState>,
    private _route: ActivatedRoute,
    public _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.workspaces$ = this._store.select(selectAll);
    this._route.queryParams.subscribe((params: Params) => {
      if (params.params && params.wp_id) {
        // parse data
        this.workspaces$.subscribe(res => {
          if (res) {
            const wp = this._commonService.findObjById(
              res,
              Number(params.wp_id)
            );
            if (!wp) return;
            const data = this._commonService.decodeBase64(params.params);
            this.onSelect(data);
          }
        });
      }
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this._store.dispatch(
          new GetCaseTempalte({
            index: "v1/query",
            query: {
              query: [
                { _name: "getOrganisation", idOrName: res.name },
                { _name: "caseTemplates" }
              ]
            },
            method: "POST"
          })
        );
      }
    });

    this.model$ = this._store.pipe(select(selectLogsSecurity));
    this.model$.subscribe((res: any) => {
      if (!res.items.length) return;
      this.pageSize = 50;
      this.totalHits = {
        value: res.count >= 500 ? 500 : res.count
      };
    });
  }

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onWindowScroll(event) {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max && this.pageSize < 500) {
      //Do your action here
      this.pageSize += 50;
    }
  }

  onSelect(data): void {
    this.dataSelected = data;
    this.isPopupDetail = true;
  }

  toTop(): void {
    window.scroll(0, 0);
  }

  sorF(sorts: { key: string; value: string }): void {
    if (!sorts.value) return;
    const sort = sorts.value === "ascend" ? "asc" : "desc";
    this.filter = {
      ...this.filter,
      sort
    };
    this.filterChange.emit(this.filter);
    this._store.dispatch(new Get(this.filter));
  }

  getOrdinalNumbers(index: number) {
    this.model$.subscribe((res: any) => {
      if (!res) return;
      this.currentPageIndex = 1;
      this.totalHits.value = res.count >= 500 ? 500 : res.count;
    });

    return (this.currentPageIndex - 1) * this.totalHits.value + index + 1;
  }
}
