import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ItemData,
  GetAgentInstallByWorkspace,
  selectGetAgentInstallByWorkspace
} from "src/app/redux/host";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";
@Component({
  selector: "vadar-create-host",
  templateUrl: "./create-host.component.html",
  styleUrls: ["./create-host.component.less"]
})
export class CreateHostComponent implements OnInit {
  listOfAllData: ItemData[] = [];
  model$: Observable<object>;
  isShowLinkdownload = true;

  @Input()
  isCreate: boolean;

  @Output()
  isCreateChange = new EventEmitter();

  workspaceSelected$: Observable<any>;

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this.listOfAllData.push({
      id: "1",
      name: `Edward King`
    });

    this.model$ = this._store.pipe(select(selectGetAgentInstallByWorkspace));
    this.model$.subscribe((res: any) => {
      if (!res || !res.length) return;
      res.forEach(elm => {
        this.isShowLinkdownload = this.showLinkdownload(elm);
        if (!this.isShowLinkdownload) return;
      });
    });
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );

    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this._store.dispatch(
          new GetAgentInstallByWorkspace({
            workspaceId: res.id
          })
        );
      }
    });
  }

  showLinkdownload(data: any) {
    if (!data || !data.workspace || !data.workspace.createdDate) {
      return false;
    }
    let d = new Date(data.workspace.createdDate);
    let dformat =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    let createDateLocal = new Date(dformat.toLocaleString() + " UTC");

    let dateCurrent = new Date().getTime();
    let createDateWorkspace = new Date(createDateLocal).getTime();
    let minutes = (dateCurrent - createDateWorkspace) / 1000 / 60;
    if (minutes >= 5) {
      return true;
    }
    return false;
  }

  getNameAgent(data) {
    return `Download ${data} agent`;
  }

  onClose(): void {
    this.isCreate = false;
    this.isCreateChange.emit(this.isCreate);
  }

  onOpen(): void {
    this.isCreate = true;
    this.isCreateChange.emit(this.isCreate);
  }
}
