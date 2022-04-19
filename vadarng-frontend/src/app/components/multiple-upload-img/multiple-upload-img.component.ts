import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NotificationService } from "src/app/services/notifications";
import { CommonService } from "src/app/services/common/common.service";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "multiple-upload-img",
  templateUrl: "./multiple-upload-img.component.html",
  styleUrls: ["./multiple-upload-img.component.less"]
})
export class MultipleUploadImgComponent {
  @Input()
  value: any[];

  @Output()
  change = new EventEmitter<object>();

  constructor(
    private _notificationService: NotificationService,
    public _commonService: CommonService
  ) {}

  /**
   * start event
   */
  handleChange(img): void {
    this.change.emit(img);
  }

  triggerInput(input) {
    input.click();
  }

  handleAddImg(e: any): void {
    const input = e.target.files[0];

    if (
      !this.hasExtension(input.name, [
        "jpeg",
        "doc",
        "docx",
        "txt",
        ".jpg",
        ".gif",
        ".png",
        ".mp4",
        ".mp3",
        ".xlsx",
        ".xls",
        ".pdf"
      ])
    ) {
      this._notificationService.error(
        this._commonService.translateText("MULTIPLE_UPLOAD.FILE_TYPE_INVALID")
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt: any) => {
      input.value = "";
      const a = {
        base64File: evt.target.result,
        fileName: +new Date() + "-" + input.name,
        contentType: input.type
      };
      this.change.emit(a);
    };
    reader.readAsDataURL(input);
  }

  removeAvatar(data) {
    if (!data) {
      return;
    }
    this.value = this.value.filter(item => item.id !== data.id);
    this.change.emit({ status: "remove", data });
    return;
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

  hasExtension(fileName, exts) {
    return new RegExp("(" + exts.join("|").replace(/\./g, "\\.") + ")$").test(
      fileName
    );
  }

  // end event
}
