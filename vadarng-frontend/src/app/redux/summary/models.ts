export interface IState {
  active?: number;
  disconnect?: number;
  healthy?: number;
  unHealthy?: number;
}

export const initialState: IState = {
  active: 0,
  disconnect: 0,
  healthy: 0,
  unHealthy: 0
};
