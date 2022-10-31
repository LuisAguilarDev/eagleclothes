import React, { createContext, useReducer, Dispatch } from "react";
import {
  mainReducer,
  INITIAL_STATE,
  shoppingCartReducer,
} from "./reducerConfig";
import {
  InitialStateType,
  ProductPayload,
  productType,
  ShoppingCartActions,
} from "./Types";

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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
