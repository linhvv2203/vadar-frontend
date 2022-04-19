import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";

import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { EActionTypes as ELoaderActionTypes } from "src/app/redux/loader/actions";
import { EActionTypes } from "src/app/redux/middleware/actions";
import { IAction } from "src/app/redux/middleware/models";
import { MiddleService } from "src/app/redux/middleware/services";

@Injectable()
export class MiddleEffects {
  constructor(
    private _actions$: Actions<Action>,
    private _service: MiddleService,
    private _store$: Store<any>
  ) {}

  @Effect()
  callApi = this._actions$.pipe(
    ofType(EActionTypes.CALL_API),
    mergeMap((action: IAction) => {
      const {
        successType = "SUCCESS",
        beforeCallType,
        afterCallType,
        afterSuccess = f => f,
        errorType,
        afterError = f => f,
        noLoading,
        ...rest
      } = action.payload;

      if (beforeCallType) {
        this._store$.dispatch({ type: beforeCallType });
      }
      if (!noLoading) {
        this._store$.dispatch({ type: ELoaderActionTypes.START_LOADING });
      }

      return this._service.callApi(rest).pipe(
        map(res => {
          if (!noLoading) {
            this._store$.dispatch({ type: ELoaderActionTypes.STOP_LOADING });
          }
          if (afterCallType) {
            this._store$.dispatch({ type: afterCallType });
          }

          afterSuccess(res, rest.params);
          return { type: successType, payload: res };
        }),
        catchError(error => {
          if (!noLoading) {
            this._store$.dispatch({ type: ELoaderActionTypes.STOP_LOADING });
          }
          if (afterCallType) {
            this._store$.dispatch({ type: afterCallType });
          }
          if (errorType) {
            this._store$.dispatch({ type: errorType, payload: error });
          }
          afterError(error, rest.params);
          return of({ type: EActionTypes.REQUEST_ERROR, payload: error });
        })
      );
    })
  );
}
