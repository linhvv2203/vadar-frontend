import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";
import { selectSetting } from "src/app/redux/setting";
import { selectedWorkspacesHeader } from "src/app/redux/workspaces";

@Component({
  selector: "vadar-top-security",
  templateUrl: "./top-security.component.html",
  styleUrls: ["./top-security.component.less"]
})
export class TopSecurityComponent implements OnInit {
  @Input()
  redirect: string = "";

  @Input()
  tabIndex: number = 0;

  listGroup = [
    {
      id: 0,
      name: "All"
    },
    {
      id: 1,
      name: "Vulnerabilities"
    },
    {
      id: 2,
      name: "Integrity monitoring"
    },
    {
      id: 3,
      name: "MITRE ATT&CK"
    },
    {
      id: 7,
      name: "PCI DSS"
    }
  ];

  @Input()
  time: any = {};

  @Output()
  timeChange = new EventEmitter();

  language$: Observable<object>;
  workspaceSelected$: Observable<any>;
  validateForm: FormGroup;
  timeReload = 0;
  timeUnit = 1000;
  timeQuery = 15;
  timeUnitQuery = 60000;
  isAutoReload = false;
  intervalAutoReload = null;
  isAbsolute = true;
  recent: string = "";
  curentRecent: any;

  lastOptions = { time: 0, unit: "" };
  queryParams: any = {};

  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _translateService: TranslateService
  ) {
    this.workspaceSelected$ = this._store.pipe(
      select(selectedWorkspacesHeader)
    );
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
      this.validateForm = this._fb.group({
        time: [this.time],
        groupId: [Number(params.groupId || 0)]
      });
    });
    this.language$ = this._store.pipe(select(selectSetting));
    this.language$.subscribe((res: any) => {
      if (!res.lang) return;
      this.checkUnit();
    });
  }

  handleAutoReload(): void {
    this.intervalAutoReload && clearInterval(this.intervalAutoReload);
    if (this.timeReload <= 0) {
      return;
    }
    this.isAutoReload = !this.isAutoReload;
    if (!this.isAutoReload) {
      return;
    }
    this.intervalAutoReload = setInterval(() => {
      if (!this.isAbsolute) {
        this.onLastTime(this.curentRecent, this.recent);
      } else this.submitForm();
    }, this.timeUnit * this.timeReload);
  }

  submitForm(): void {
    const { value } = this.validateForm;
    this.timeChange.emit([...value.time]);
    this._router.navigate([window.location.pathname], {
      queryParams: {
        events: this.queryParams.events,
        groupId: value.groupId,
        tabIndex: this.tabIndex
      }
    });
  }

  onLastTime(time: any, recent): void {
    this.recent = recent;
    this.curentRecent = time;
    this.isAbsolute = false;
    const now = new Date();
    let last = null;
    if (time === "today") {
      last = new Date();
      last.setHours(0);
      last.setMinutes(0);
      last.setSeconds(0);
      last.setMilliseconds(0);
    } else if (time === "thisweek") {
      last = new Date(now.getTime() - now.getDay() * 24 * 60 * 60000);
      last.setHours(0);
      last.setMinutes(0);
      last.setSeconds(0);
      last.setMilliseconds(0);
    } else last = new Date(now.getTime() - time);
    this.validateForm.controls["time"].setValue([last, now]);
    this.submitForm();
  }

  onAbsolute(): void {
    this.isAbsolute = true;
  }

  onApply(): void {
    this.lastOptions = { ...this.lastOptions, time: this.timeQuery };
    this.checkUnit();
    this.onLastTime(
      this.timeUnitQuery * this.timeQuery,
      "SECURITY.LAST_OPTIONS"
    );
  }

  onTimeQueryChange(value): void {
    this.timeQuery = Number(value);
    this.lastOptions = { ...this.lastOptions, time: this.timeQuery };
  }

  onTimeUnitQueryChange(value): void {
    this.timeUnitQuery = Number(value);
    this.checkUnit();
  }

  checkUnit(): void {
    switch (this.timeUnitQuery) {
      case 1000:
        this._translateService
          .get("GLOBAL.SECONDS")
          .subscribe((res: string) => {
            this.lastOptions = { ...this.lastOptions, unit: res };
          });
        break;
      case 60000:
        this._translateService.get("GLOBAL.MINUTE").subscribe((res: string) => {
          this.lastOptions = { ...this.lastOptions, unit: res };
        });
        break;
      case 60000 * 60:
        this._translateService.get("GLOBAL.HOURS").subscribe((res: string) => {
          this.lastOptions = { ...this.lastOptions, unit: res };
        });
        break;
      case 60000 * 60 * 24:
        this._translateService.get("GLOBAL.DAYS").subscribe((res: string) => {
          this.lastOptions = { ...this.lastOptions, unit: res };
        });
        break;
      case 60000 * 60 * 24 * 30:
        this._translateService.get("GLOBAL.MONTHS").subscribe((res: string) => {
          this.lastOptions = { ...this.lastOptions, unit: res };
        });
        break;
      case 60000 * 60 * 24 * 365:
        this._translateService.get("GLOBAL.YEARS").subscribe((res: string) => {
          this.lastOptions = { ...this.lastOptions, unit: res };
        });
        break;
    }
  }
}
