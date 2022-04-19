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
  selector: "vadar-donut-chart",
  templateUrl: "./donut-chart.component.html",
  styleUrls: ["./donut-chart.component.less"]
})
export class DonutChartComponent implements OnChanges {
  @Input()
  data = [];
  @Input()
  type: string = "chartdonut";
  @Input()
  className: string = "chartdiv";

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
    this.chart = am4core.create(html, am4charts.PieChart);
    this.chart.data = this.data;

    // Add and configure Series
    let fields = Object.keys(this.chart.data[0]);
    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = fields[1];
    pieSeries.dataFields.category = fields[0];

    // Let's cut a hole in our Pie chart the size of 30% the radius
    this.chart.innerRadius = am4core.percent(50);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer"
      }
    ];

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.position = "top";
    this.chart.legend.scrollable = true;
    this.chart.legend.maxHeight = 105;
    this.chart.legend.marginBottom = 0;
  }
}
