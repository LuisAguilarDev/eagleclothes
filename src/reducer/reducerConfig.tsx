import {
  productType,
  InitialStateType,
  ShoppingCartActions,
  Types,
} from "./Types";

export const INITIAL_STATE = {
  loading: false,
  search: [],
  shoppingCart: [],
  favorites: [],
  quantity: 0,
  pagination: { currentPage: 1, lastPage: 1 },
};

export const shoppingCartReducer = (
  state: InitialStateType,
  action: ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Update:
      return {
        ...state,
        loading: !state.loading,
      };
    case Types.Add:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };
    case Types.Delete:
      console.log(action);
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (product: productType) => product.code !== action.payload.code
        ),
      };
    case Types.ClearChart:
      return {
        ...state,
        shoppingCart: [],
      };
    default:
      return state;
  }
};

export const mainReducer = (
  shoppingCart: InitialStateType,
  action: ShoppingCartActions
) => ({
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});
