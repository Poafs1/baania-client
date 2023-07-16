import { Context, createContext, useContext, useReducer } from 'react';

interface IState {
  apiEndpoint?: string;
}

const defaultState: IState = {
  apiEndpoint: undefined,
};

type Action = { type: 'DEFAULT'; payload: null } | { type: 'SET_API_ENDPOINT'; payload: IState['apiEndpoint'] };

const reducer = (state: IState = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_API_ENDPOINT':
      return {
        ...state,
        apiEndpoint: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const DispatchContext: Context<any> = createContext(defaultState);
const StoreContext: Context<any> = createContext(defaultState);

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState as never);

  return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
};

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
