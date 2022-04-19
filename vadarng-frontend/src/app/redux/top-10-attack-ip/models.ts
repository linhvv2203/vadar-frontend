export interface IState {
  data: any;
  label: any;
}

const convertData = () => {
  const c = {
    data: [],
    label: []
  };
  [].forEach((elm, i) => {
    c.data.push(1);
    c.label.push(i);
  });
  return c;
};

export const initialState: IState = convertData();
