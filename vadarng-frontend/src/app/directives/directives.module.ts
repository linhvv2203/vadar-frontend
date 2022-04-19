import { NgModule } from "@angular/core";
import { ClickStopPropagationDirective } from "./click-stop-propagation.directive";
import { ClickPreventDefaultDirective } from "./click-prevent-default.directive";
@NgModule({
  declarations: [ClickStopPropagationDirective, ClickPreventDefaultDirective],
  exports: [ClickStopPropagationDirective, ClickPreventDefaultDirective]
})
export class DirectivesModule {}
