import { Directive, HostListener } from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[clickPreventDefault]"
})
export class ClickPreventDefaultDirective {
  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.preventDefault();
  }
}
