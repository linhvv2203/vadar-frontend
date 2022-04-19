import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "date",
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, pattern: string = "mediumDate"): any {
    const lang = this.translateService.currentLang === "vn" ? "vi" : "en";
    const datePipe: DatePipe = new DatePipe(lang);
    return datePipe.transform(new Date(value).toJSON(), pattern);
  }
}
