import { Action } from "@ngrx/store";

export enum EActionTypes {
  START_LOADING = "[LOADER]_START_LOADING",
  STOP_LOADING = "[LOADER]_STOP_LOADING",
  TOGGLE_LOADING = "[LOADER]_TOGGLE_LOADING"
}

export class StartLoader implements Action {
  readonly type = EActionTypes.START_LOADING;
}
export class StopLoader implements Action {
  readonly type = EActionTypes.STOP_LOADING;
}
export class ToggleLoader implements Action {
  readonly type = EActionTypes.TOGGLE_LOADING;
}

export type LoaderActions = StartLoader | StopLoader | ToggleLoader;
