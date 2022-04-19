import { NgModule } from "@angular/core";

import { ComponentsModule } from "src/app/components/components.module";
import { NotFoundComponent } from "src/app/containers/not-found/not-found.component";
import { UnauthorizedComponent } from "src/app/containers/unauthorized/unauthorized.component";
import { ForbiddenComponent } from "src/app/containers/forbidden/forbidden.component";
import { CallbackComponent } from "src/app/containers/callback/callback/callback.component";
import { CallbackSilentComponent } from "src/app/containers/callback/callback-silent/callback-silent.component";
import { ChooseWorkspaceComponent } from "./choose-workspace/choose-workspace.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  imports: [ComponentsModule],
  providers: [],
  declarations: [
    NotFoundComponent,
    CallbackComponent,
    CallbackSilentComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    ChooseWorkspaceComponent,
    LogoutComponent
  ],
  exports: [
    NotFoundComponent,
    CallbackComponent,
    CallbackSilentComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    ChooseWorkspaceComponent
  ]
})
export class ContainersModule {}
