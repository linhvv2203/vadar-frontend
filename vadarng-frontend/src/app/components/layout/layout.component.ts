import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/redux/app.state";
import { selectShowLeftMenu } from "src/app/redux/left-menu";
@Component({
  selector: "vadar-main-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
  stateLeftMenu$: Observable<boolean>;

  @Input()
  isVisible: boolean = false;

  @Input()
  id: any = "";

  @Output()
  isVisibleChange = new EventEmitter();

  @Output()
  callback = new EventEmitter();

  audio = new Audio();
  times = 3;

  constructor(private _store: Store<IAppState>) {
    this.audio.src = "../../../assets/media/warning.wav";

    this.audio.addEventListener(
      "ended",
      () => {
        this.times--;
        if (!this.times) {
          this.times = 3;
          return;
        }
        this.audio.currentTime = 0;
        this.audio.play();
      },
      false
    );
    this.audio.load();
  }

  ngOnInit() {
    this.stateLeftMenu$ = this._store.pipe(select(selectShowLeftMenu));
  }

  @HostListener("document:keyup.shift.Enter", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.open();
    this.audio.play();
  }

  handleOk(): void {
    this.callback.emit(this.id);
    this.close();
  }

  open(): void {
    this.isVisible = true;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleCancel(): void {
    this.callback.emit(false);
    this.close();
  }

  close(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
