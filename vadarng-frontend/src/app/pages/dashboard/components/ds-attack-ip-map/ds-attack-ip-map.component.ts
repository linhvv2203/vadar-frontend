import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "vadar-ds-attack-ip-map",
  templateUrl: "./ds-attack-ip-map.component.html",
  styleUrls: ["./ds-attack-ip-map.component.less"]
})
export class DsAttackIpMapComponent implements OnChanges {
  values = {};
  markers = [];

  j: any = window;
  $ = this.j.$;

  @Input()
  data: any;

  @Input()
  time: number;

  @Output()
  timeChange = new EventEmitter();

  timeOut = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data) return;
    const { currentValue } = changes.data;
    if (!this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
    this.timeOut = setTimeout(() => {
      const dt = this.renderCountry(currentValue);
      this.createMap(dt);
    }, 2000);
  }

  onChangeTime(event) {
    this.time = event;
    this.timeChange.emit(event);
  }

  createMap(dt): void {
    this.$("#map").html("");
    this.$("#map").vectorMap({
      map: "world_mill_en",
      backgroundColor: "#fff",
      markers: dt.markers,
      markerStyle: {
        initial: {
          fill: "#dc3545",
          stroke: "#ef939c",
          r: 3
        }
      },
      series: {
        regions: [
          {
            scale: ["#b7e8ff", "#0071A4"],
            normalizeFunction: "polynomial",
            values: dt.values
          }
        ]
      },
      regionStyle: {
        initial: {
          fill: "#cccccc"
        }
      },
      onRegionTipShow: (e, el, code) => {
        el.html(el.html() + " (" + (dt.values[code] || 0) + ")");
      }
    });
  }

  renderCountry(data) {
    const markers = [];
    const values = {};

    for (let i = 0; i < data.length; i++) {
      values[data[i].countryCode] = data[i].total;
      markers.push({
        latLng: [data[i].lat, data[i].lon],
        name: `${data[i].country} (${data[i].total})`
      });
    }

    return {
      markers,
      values
    };
  }
}
