import {
  productType,
  InitialStateType,
  ShoppingCartActions,
  Types,
} from "./Types";

export const INITIAL_STATE = {
  search: [],
  shoppingCart: [],
  favorites: [],
  pagination: { currentPage: 1, lastPage: 1 },
};

export const shoppingCartReducer = (
  state: InitialStateType,
  action: ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Add:
      console.log(action);
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
    default:
      console.log(action);
      return state;
  }
};

export const mainReducer = (
  shoppingCart: InitialStateType,
  action: ShoppingCartActions
) => ({
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});
