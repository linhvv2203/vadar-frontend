import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
@Component({
  selector: "vadar-bubble-chart",
  templateUrl: "./bubble-chart.component.html",
  styleUrls: ["./bubble-chart.component.less"]
})
export class BubbleChartComponent implements OnChanges {
  @Input()
  data = [];
  @Input()
  type: string = "bubble";
  @Input()
  className: string = "chartdiv";
  @Input()
  label: string = "name";
  @Input()
  dateFormat: string = "MM/dd/yyyy HH:mm:ss";

  chart: any;

  constructor() {}

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

    this.chart.colors.step = 3;

    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    Object.keys(this.chart.data).length &&
      Object.entries(this.chart.data).forEach(([key, value]) => {
        let label = value[this.label];
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.data = value["value"];
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.dataFields.value = "value";
        series.name = label;
        series.strokeWidth = 0;

        // Make bullets
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.strokeOpacity = 0.2;
        bullet.stroke = am4core.color("#ffffff");
        bullet.nonScalingStroke = true;
        series.heatRules.push({
          target: bullet.circle,
          min: 10,
          max: 60,
          property: "radius"
        });

        series.tooltipHTML = `<span style="color: #343a40;"><div class="pt-1" style="line-height: .5"><b class="font-13">{dateX}</b></div><span class='font-12'>${label}: <b>{valueY}</b></span></span>`;
      });

    this.chart.legend = new am4charts.Legend();
    this.chart.legend.position = "top";
    this.chart.legend.scrollable = true;
    this.chart.legend.maxHeight = 105;
    this.chart.legend.marginBottom = 30;

    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.maxTooltipDistance = 5;
    this.chart.cursor.xAxis = dateAxis;
  }
}
