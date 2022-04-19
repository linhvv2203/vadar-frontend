import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { LocalizedDatePipe } from "src/app/pipes/localizedDate";

import { NgZorroAntdModule } from "ng-zorro-antd";
import { ReduxModule } from "src/app/redux/redux.module";
import { DirectivesModule } from "src/app/directives/directives.module";
import { HeaderComponent } from "src/app/components/header/header.component";
import { LayoutComponent } from "src/app/components/layout/layout.component";
import { SelectLangComponent } from "src/app/components/select-lang/select-lang.component";
import { NavigateAvatarComponent } from "src/app/components/navigate-avatar/navigate-avatar.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { SingleUploadImgComponent } from "./single-upload-img/single-upload-img.component";
import { MultipleUploadImgComponent } from "./multiple-upload-img/multiple-upload-img.component";
import { LeftMenuComponent } from "./left-menu/left-menu.component";
import { CustomProgressComponent } from "./custom-progess/custom-progess.component";

// pipe
import { MoneyPipe } from "src/app/pipes/money";
import { SafePipe } from "../pipes/safePipe";
import { NumberPipe } from "../pipes/number";

import { LineChartComponent } from "./line-chart/line-chart.component";
import { DeleteModalComponent } from "./delete-modal/delete-modal.component";
import { GuidePopupComponent } from "./guide-popup/guide-popup.component";
import { ChatWithExpertComponent } from "./chat-with-expert/chat-with-expert.component";
import { DonutChartComponent } from "./donut-chart/donut-chart.component";
import { LineChartWithoutFillComponent } from "./line-chart-without-fill/line-chart-without-fill.component";
import { BubbleChartComponent } from "./bubble-chart/bubble-chart.component";
import { TicketPopupWarningComponent } from "./ticket-popup-warning/ticket-popup-warning.component";
import { StackedColumnChartComponent } from "./stacked-column-chart/stacked-column-chart.component";
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    // redux
    ReduxModule,

    // directive
    DirectivesModule,

    // antd
    NgZorroAntdModule,

    // angular
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,

    // translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    LocalizedDatePipe,
    HeaderComponent,
    LayoutComponent,
    SelectLangComponent,
    NavigateAvatarComponent,
    LoaderComponent,
    SingleUploadImgComponent,
    MultipleUploadImgComponent,
    LeftMenuComponent,
    CustomProgressComponent,
    MoneyPipe,
    SafePipe,
    NumberPipe,
    LineChartComponent,
    DeleteModalComponent,
    GuidePopupComponent,
    ChatWithExpertComponent,
    DonutChartComponent,
    LineChartWithoutFillComponent,
    BubbleChartComponent,
    TicketPopupWarningComponent,
    StackedColumnChartComponent
  ],
  exports: [
    // pipes
    LocalizedDatePipe,
    MoneyPipe,
    SafePipe,
    NumberPipe,

    // redux
    ReduxModule,

    // directive
    DirectivesModule,

    // antd
    NgZorroAntdModule,

    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // translate
    TranslateModule,

    // add-on

    // component
    HeaderComponent,
    LayoutComponent,
    SelectLangComponent,
    NavigateAvatarComponent,
    LoaderComponent,
    SingleUploadImgComponent,
    MultipleUploadImgComponent,
    LeftMenuComponent,
    CustomProgressComponent,
    DonutChartComponent,
    LineChartComponent,
    DeleteModalComponent,
    GuidePopupComponent,
    ChatWithExpertComponent,
    LineChartWithoutFillComponent,
    BubbleChartComponent,
    TicketPopupWarningComponent,
    StackedColumnChartComponent
  ]
})
export class ComponentsModule {}
