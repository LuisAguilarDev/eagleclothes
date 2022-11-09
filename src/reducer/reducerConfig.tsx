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
    case Types.Add:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
        quantity: action.payload.quantity
          ? action.payload.quantity + state.quantity
          : state.quantity,
      };
    case Types.Delete:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (product: productType) => product.code !== action.payload.code
        ),
      };
    case Types.ClearCart:
      return {
        ...state,
        shoppingCart: [],
        quantity: 0,
      };
    case Types.GetCart:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, ...action.payload],
      };
    case Types.SetQuantity:
      return {
        ...state,
        quantity: state.quantity + action.payload,
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
