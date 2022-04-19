import { Component, OnInit, Input } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { ItemData, Get, select as selectEvent } from "src/app/redux/events";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";

@Component({
  selector: "vadar-event-table",
  templateUrl: "./event-table.component.html",
  styleUrls: ["./event-table.component.less"]
})
export class EventTableComponent implements OnInit {
  confirmModal: NzModalRef;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  model$: Observable<object>;
  mapOfCheckedId: { [key: string]: boolean } = {};
  currentPageIndex = 1;

  @Input()
  filterParam: string;

  currentPageDataChange($event: ItemData[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.id]
    );
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(
      item => (this.mapOfCheckedId[item.id] = value)
    );
    this.refreshStatus();
  }
  constructor(
    private _store: Store<IAppState>,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.model$ = this._store.pipe(select(selectEvent));
    // this._store.dispatch(new Get());
  }

  onPageChange(event): void {
    this.currentPageIndex = event;
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: "Do you Want to delete these items?",
      nzContent:
        "When clicked the OK button, this dialog will be closed after 1 second",
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"))
    });
  }
}
