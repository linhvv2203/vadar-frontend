import { NgModule } from "@angular/core";

import { StoreModule, ActionReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { storeLogger } from "ngrx-store-logger";

import { appReducers, IAppState } from "src/app/redux/app.state";

import { AppEffects } from "src/app/redux/app.effects";

export function logger(reducer: ActionReducer<IAppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = []; // !environment.production ? [logger] : [];

@NgModule({
  imports: [
    // redux
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot(AppEffects),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" })
  ],
  declarations: [],
  exports: [
    // redux
    StoreModule,
    EffectsModule
  ]
})
export class ReduxModule {}
