import React, { createContext, useReducer, Dispatch, useMemo } from 'react';
import { INITIAL_STATE, shoppingCartReducer } from './reducerConfig';
import { InitialStateType, ShoppingCartActions } from './Types';

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ShoppingCartActions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
type Props = {
  children: React.ReactNode;
};
const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, INITIAL_STATE);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
