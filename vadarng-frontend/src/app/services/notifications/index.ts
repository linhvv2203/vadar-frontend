import { NzNotificationService } from "ng-zorro-antd";
import { TranslateService } from "@ngx-translate/core";
import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class NotificationService {
  @Output() languageChanged: EventEmitter<any> = new EventEmitter();
  @Output() workspaceChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private _notification: NzNotificationService,
    private _translateService: TranslateService
  ) {}

  changeLanguage(langCode) {
    this.languageChanged.emit(langCode);
  }

  info(message: string = "COMMON.INFO"): void {
    this._translateService.get(message).subscribe((res: string) => {
      this._show("info", res);
    });
  }

  success(message: string = "COMMON.SUCCESS"): void {
    this._translateService.get(message).subscribe((res: string) => {
      this._show("success", res);
    });
  }

  warning(message: string = "COMMON.WARNING"): void {
    this._translateService.get(message).subscribe((res: string) => {
      this._show("warning", res);
    });
  }

  error(message: string = "COMMON.ERROR"): void {
    this._translateService.get(message).subscribe((res: string) => {
      this._show("error", res);
    });
  }

  private _show(type: string, message: string): void {
    if (this._notification) {
      if (type === "error") {
        this._notification.create(type, message, null, {
          nzStyle: { top: "40px" },
          nzDuration: 15000
        });
      } else {
        this._notification.create(type, message, null, {
          nzStyle: { top: "40px" },
          nzDuration: 5000
        });
      }
    }
  }
}
