import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CommonService } from "src/app/services/common/common.service";
import { selectSetting } from "src/app/redux/setting/selectors";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { IAppState } from "src/app/redux/app.state";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
@Component({
  selector: "vadar-line-chart-without-fill",
  templateUrl: "./line-chart-without-fill.component.html",
  styleUrls: ["./line-chart-without-fill.component.less"]
})
export class LineChartWithoutFillComponent implements OnChanges {
  @Input()
  data = [];
  @Input()
  type: string = "lineChartWithoutFill";
  @Input()
  className: string = "chartdiv";
  @Input()
  label: string = "levelName";
  @Input()
  dateFormat: string = "MM/dd/yyyy HH:mm:ss";
  @Input()
  translate: boolean = false;

  chart: any;
  language$: Observable<object>;

  constructor(
    private _store: Store<IAppState>,
    private _commonService: CommonService
  ) {
    this.language$ = this._store.pipe(select(selectSetting));
    this.language$.subscribe((res: any) => {
      if (!res.lang) return;
      this.type && this.data.length && this.createChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.type && this.data.length && this.createChart();
    }, 10);
  }

  createChart(): void {
    // Add data
    let html = document.getElementById(this.type);
    if (!html) return;
    this.chart = am4core.create(html, am4charts.XYChart);
    this.chart.dateFormatter.dateFormat = this.dateFormat;
    this.chart.dateFormatter.inputDateFormat = this.dateFormat;
    this.chart.paddingRight = 25;

    this.chart.data = this.data;

    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    if (this.type != "lineChartWithoutLegend") {
      Object.keys(this.chart.data).length &&
        Object.entries(this.chart.data).forEach(([key, value]) => {
          let label = value[this.label];

          let series = this.chart.series.push(new am4charts.LineSeries());

          if (this.translate) {
            this._commonService.translateText("API." + label, res => {
              label = res;
            });
          }
          series.name = label;

          series.data = value["value"];
          series.dataFields.valueY = "value";
          series.dataFields.dateX = "date";
          series.strokeWidth = 2;

          // Make bullets
          let bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.circle.fill = am4core.color("#fff");
          if (value["value"].length === 1) {
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 3;
          } else {
            bullet.circle.strokeWidth = 1;
            bullet.circle.radius = 2;
          }

          series.tooltipHTML = `<span style="color: #343a40;"><div class="pt-1" style="line-height: .5"><b class="font-13">{dateX}</b></div><span class='font-12'>${label}: <b>{valueY}</b></span></span>`;
        });

      this.chart.legend = new am4charts.Legend();
      this.chart.legend.position = "top";
      this.chart.legend.scrollable = true;
      this.chart.legend.maxHeight = 105;
      this.chart.legend.marginBottom = 30;
    } else {
      let series = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.tooltipHTML = `<span style="color: #343a40; line-height: .5" class="pt-1 font-13"><b>{dateX}: {valueY}</b></span>`;

      // Make bullets
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("#fff");
      if (this.chart.data.length === 1) {
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 3;
      } else {
        bullet.circle.strokeWidth = 1;
        bullet.circle.radius = 2;
      }
    }

    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.maxTooltipDistance = 5;
    this.chart.cursor.xAxis = dateAxis;
  }
}
