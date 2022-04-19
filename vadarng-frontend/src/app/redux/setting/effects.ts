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
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { en_US, NzI18nService } from "ng-zorro-antd";

import { environment } from "src/environments/environment";

import { LocalStorageService } from "src/app/services/local-storage";
import { IState } from "src/app/redux/setting/models";
import { selectSetting } from "src/app/redux/setting/selectors";
import {
  SettingActions,
  ESettingActionTypes,
  GetSetting,
  GetSettingSuccess
} from "src/app/redux/setting/actions";

const SETTINGS_KEY = environment.localStorage.settingsKey;

@Injectable()
export class SettingEffects {
  constructor(
    private _i18n: NzI18nService,
    private _actions$: Actions<SettingActions>,
    private _store$: Store<IState>,
    private _translateService: TranslateService,
    private _localStorageService: LocalStorageService
  ) {}

  @Effect()
  getSetting = this._actions$.pipe(
    ofType<GetSetting>(ESettingActionTypes.GET_SETTING),
    withLatestFrom(this._store$.pipe(select(selectSetting))),
    switchMap(([, settings]) => {
      return of(new GetSettingSuccess(settings));
    })
  );

  @Effect({ dispatch: false })
  persistSettings = this._actions$.pipe(
    ofType(ESettingActionTypes.CHANGE_LANGUAGE),
    withLatestFrom(this._store$.pipe(select(selectSetting))),
    tap(([, settings]) =>
      this._localStorageService.setItem(SETTINGS_KEY, settings)
    )
  );

  @Effect({ dispatch: false })
  setTranslateServiceLanguage$ = this._store$.pipe(
    select(selectSetting),
    map(settings => settings.lang),
    distinctUntilChanged(),
    tap(language => {
      moment.locale(language === "vn" ? "vi" : "en");
      this._i18n.setLocale(en_US); // language === 'vn' ? vi_VN : en_US
      this._translateService.use(language);
    })
  );
}
