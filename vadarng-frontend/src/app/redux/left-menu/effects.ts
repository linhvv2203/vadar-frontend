import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import {
  tap,
  map,
  distinctUntilChanged,
  switchMap,
  withLatestFrom
} from "rxjs/operators";

import { IState } from "src/app/redux/left-menu/models";
import { selectShowLeftMenu } from "src/app/redux/left-menu/selectors";
import {
  SettingActions,
  ESettingActionTypes,
  GetSettingSuccess
} from "src/app/redux/left-menu/actions";

@Injectable()
export class SettingEffects {
  constructor(
    private _actions$: Actions<SettingActions>,
    private _store$: Store<IState>
  ) {}

  @Effect()
  getSetting = this._actions$.pipe(
    ofType<GetSettingSuccess>(ESettingActionTypes.GET_SHOW_LEFT_MENU),
    withLatestFrom(this._store$.pipe(select(selectShowLeftMenu))),
    switchMap(([, settings]) => {
      return of(new GetSettingSuccess(settings));
    })
  );

  @Effect({ dispatch: false })
  setShowLeftMenu$ = this._store$.pipe(
    select(selectShowLeftMenu),
    map(showLeftMenu => showLeftMenu),
    distinctUntilChanged(),
    tap(language => {})
  );
}
