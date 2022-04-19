import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { NotificationService } from "src/app/services/notifications";
import { TranslateService } from "@ngx-translate/core";
@Component({
  // tslint:disable-next-line: component-selector
  selector: "single-upload-img",
  templateUrl: "./single-upload-img.component.html",
  styleUrls: ["./single-upload-img.component.less"]
})
export class SingleUploadImgComponent implements OnChanges {
  @Input() value: string;
  // tslint:disable-next-line: no-input-rename
  @Input("showCopy") showCopyBtn: boolean;

  @Output()
  change = new EventEmitter<object>();

  avatarUrl: string;
  isShowCopyBtn = false;
  loading = false;

  constructor(
    private _notificationService: NotificationService,
    private translateService: TranslateService
  ) {}

  ngOnChanges() {
    this.isShowCopyBtn = this.showCopyBtn;
    this.avatarUrl = this.value;
  }

  copyUrl = (url: string) => {
    const el = document.createElement("textarea");
    el.value = url;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this._notificationService.success("copied");
    return;
  };

  removeAvatar(url) {
    this.avatarUrl = undefined;
    this.value = undefined;
    this.change.emit({ status: "remove", url });
    this.loading = false;
    return;
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result.toString()));
    reader.readAsDataURL(img);
  }

  handleChange({ file }): void {
    this.loading = true;
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    if (!isJPG && !isPNG) {
      this.loading = false;
      this.translateService
        .get("UPLOAD_AVATAR.YOU_CAN_ONLY_UPLOAD_JPG&PNG")
        .subscribe((res: string) => {
          this._notificationService.error(res);
        });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.loading = false;
      this.translateService
        .get("UPLOAD_AVATAR.IMAGE_MUST_SMALLER_THAN_2MB")
        .subscribe((res: string) => {
          this._notificationService.error(res);
        });
      return;
    }
    this.getBase64(file.originFileObj, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
      this.change.emit({
        base64File: img,
        fileName: +new Date() + "-" + file.name,
        contentType: file.type
      });
    });
  }
}
