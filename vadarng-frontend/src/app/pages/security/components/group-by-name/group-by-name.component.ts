import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { select as selected } from "src/app/redux/logs-security-group-by";
@Component({
  selector: "vadar-group-by-name",
  templateUrl: "./group-by-name.component.html",
  styleUrls: ["./group-by-name.component.less"]
})
export class GroupByNameComponent implements OnInit {
  model$: Observable<any>;

  @Input()
  filter: object = {};

  @Output()
  filterChange = new EventEmitter();

  pageSize = 50;
  totalHits = {
    value: 0
  };

  constructor(private _store: Store<IAppState>, private _router: Router) {
    this.model$ = this._store.pipe(select(selected));
  }

  ngOnInit(): void {
    this.model$.subscribe((res: any) => {
      if (!res) return;
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

  toTop(): void {
    window.scroll(0, 0);
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
