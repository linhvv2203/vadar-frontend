import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import {
  select as selectTopAttack,
  Get as GetTopAttack,
  DetectIP
} from "src/app/redux/top-10-attack-ip";
import {
  select as selectPerByTime,
  Get as GetEventsPer
} from "src/app/redux/events-performance";
import {
  select as selectSecByTime,
  Get as GetEventsSec
} from "src/app/redux/events-secutiry";
import { Router } from "@angular/router";
import { EnPermissions } from "src/app/enums/enums";
import { CommonService } from "src/app/services/common/common.service";
import { select as selectAuth } from "src/app/redux/auth";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-dashboard",
  templateUrl: "./dashboard.html",
  styleUrls: ["./dashboard.less"]
})
export class Dashboard implements OnInit, OnDestroy {
  visible: boolean;
  listCountry: any = [];

  dataAttack$: Observable<any>;
  perEventsByTime$: Observable<any>;
  secEventsByTime$: Observable<any>;
  auth$: Observable<object>;
  workspaceSelected$: Observable<any>;
  workspaceId = null;

  // interval
  intervalTopAttack = null;
  timeTopAttack = 300000;

  intervalEventsPer = null;
  timeEventsPer = 300000;

  intervalEventsSec = null;
  timeEventsSec = 300000;

  param = {};

  constructor(
    private _store: Store<IAppState>,
    public _commonService: CommonService,
    private _router: Router
  ) {}

  ngOnInit() {
    // --- Role & Permission
    this.auth$ = this._store.pipe(select(selectAuth));
    this.auth$.subscribe((data: any) => {
      if (data && data.systemPermissions) {
        if (
          !this._commonService.validatePermission(
            [
              EnPermissions.FullPermission,
              EnPermissions.DashboardView,
              EnPermissions.AllDashboardsView
            ],
            data.systemPermissions
          )
        ) {
          this._router.navigate(["/forbidden"]);
          return;
        }
      }
    });
    // --- end Role & Permssion

    this.dataAttack$ = this._store.pipe(select(selectTopAttack));
    this.perEventsByTime$ = this._store.pipe(select(selectPerByTime));
    this.secEventsByTime$ = this._store.pipe(select(selectSecByTime));

    this.dataAttack$.subscribe(res => {
      this.listCountry = [];
      res.label.forEach((element, index) => {
        this._store.dispatch(
          new DetectIP(element, country => {
            if (country.status === "success") {
              const i = this._commonService.findObj(
                [...this.listCountry],
                "countryCode",
                country.countryCode
              );
              if (i === -1) {
                this.listCountry.push({ ...country, total: res.data[index] });
              } else {
                this.listCountry[i].total += res.data[index];
              }
            }
          })
        );
      });
    });

    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
    this.workspaceSelected$.subscribe(res => {
      if (res) {
        this.workspaceId = res.id;
        this.getDashboardInfor();
      }
    });
  }

  ngOnDestroy() {
    this.clearAllInterVal();
  }

  clearAllInterVal() {
    // clear interval
    this.intervalTopAttack && clearInterval(this.intervalTopAttack);
    this.intervalTopAttack = null;
    this.intervalEventsPer && clearInterval(this.intervalEventsPer);
    this.intervalEventsPer = null;
    this.intervalEventsSec && clearInterval(this.intervalEventsSec);
    this.intervalEventsSec = null;
  }

  getDashboardInfor() {
    this.onTopAttackTimeChange(this.timeTopAttack);
    this.onEventsPerTimeChange(this.timeEventsPer);
    this.onEventsSecTimeChange(this.timeEventsSec);
  }

  onTopAttackTimeChange(event) {
    this.intervalTopAttack && clearInterval(this.intervalTopAttack);
    if (!event) {
      return;
    }
    this.timeTopAttack = event;
    this._store.dispatch(new GetTopAttack(Number(this.workspaceId)));
    this.intervalTopAttack = setInterval(() => {
      this._store.dispatch(new GetTopAttack(Number(this.workspaceId)));
    }, event);
  }

  onEventsPerTimeChange(event) {
    this.param = {
      workSpaceId: Number(this.workspaceId),
      fromDate: this._commonService.getDayAgo(7),
      toDate: new Date()
    };
    this.intervalEventsPer && clearInterval(this.intervalEventsPer);
    if (!event) {
      return;
    }
    this.timeEventsPer = event;
    this._store.dispatch(
      new GetEventsPer({ ...this.param, searchLevel: true })
    );
    this.intervalEventsPer = setInterval(() => {
      this._store.dispatch(
        new GetEventsPer({ ...this.param, searchLevel: true })
      );
    }, event);
  }

  onEventsSecTimeChange(event) {
    this.param = {
      workSpaceId: Number(this.workspaceId),
      fromDate: this._commonService.getDayAgo(7),
      toDate: new Date()
    };
    this.intervalEventsSec && clearInterval(this.intervalEventsSec);
    if (!event) {
      return;
    }
    this.timeEventsSec = event;
    this._store.dispatch(
      new GetEventsSec({ ...this.param, searchLevel: true })
    );
    this.intervalEventsSec = setInterval(() => {
      this._store.dispatch(
        new GetEventsSec({ ...this.param, searchLevel: true })
      );
    }, event);
  }
}
