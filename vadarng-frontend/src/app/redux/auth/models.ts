import { IAppState } from "src/app/redux/app.state";

export const initialAuthState: IState = { auth: {} };

export interface IState {
  auth: any;
}
