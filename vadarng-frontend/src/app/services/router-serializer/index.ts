import { Injectable } from "@angular/core";
import { RouterStateSnapshot, Router, NavigationEnd } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";
import { AuthFlowService } from "src/app/services/auth/auth-flow.service";

import { IRouterStateUrl } from "./router.state";

@Injectable()
export class CustomSerializer
  implements RouterStateSerializer<IRouterStateUrl> {
  constructor(
    private _authFlowService: AuthFlowService,
    private _router: Router
  ) {
    this._router.events.subscribe(nav => {
      if (nav instanceof NavigationEnd) {
        this._authFlowService.checkAuthFlow(nav.urlAfterRedirects);
      }
    });
  }

  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
