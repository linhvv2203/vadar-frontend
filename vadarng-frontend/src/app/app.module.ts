import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import vi from "@angular/common/locales/vi";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

import { ComponentsModule } from "src/app/components/components.module";
import { ContainersModule } from "src/app/containers/containers.module";
import { PagesModule } from "src/app/pages/pages.module";
import { ServicesModule } from "src/app/services/services.module";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";

registerLocaleData(vi);
moment.locale("vi");

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ServicesModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,

    ComponentsModule,
    ContainersModule,
    PagesModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (tran: TranslateService) => {
        return tran.currentLang === "vn" ? "vi" : "en";
      },
      deps: [TranslateService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
