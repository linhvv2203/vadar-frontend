import { IAppState } from "src/app/redux/app.state";

export interface IState extends IAppState {
  showLeftMenu: boolean;
}
