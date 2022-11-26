import {
  productType,
  InitialStateType,
  ShoppingCartActions,
  Types,
} from "./Types";

export const INITIAL_STATE = {
  loading: false,
  search: [],
  filter: [],
  favorites: [],
  quantity: 0,
  address: [],
};

export const shoppingCartReducer = (
  state: InitialStateType,
  action: ShoppingCartActions
) => {
  switch (action.type) {
    case Types.GetFavs:
      return {
        ...state,
        favorites: [...action.payload],
      };
    case Types.DeleteFav:
      return {
        ...state,
        favorites: state.favorites
          ? state.favorites.filter(
              (product: productType) => product.code !== action.payload.code
            )
          : [],
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
        shoppingCart: [...action.payload],
      };
    case Types.SetQuantity:
      return {
        ...state,
        quantity: state.quantity + action.payload,
      };
    case Types.Search:
      return {
        ...state,
        search: [...action.payload],
        filter: [...action.payload],
      };
    case Types.Loading:
      return {
        ...state,
        loading: action.payload,
      };
    case Types.GetAddress:
      return {
        ...state,
        address: action.payload,
      };
    case Types.FilterPrice:
      return {
        ...state,
        filter: state.search
          ? state.search.filter(
              (product: productType) => product.price.value === action.payload
            )
          : [],
      };
    case Types.FilterCategory:
      return {
        ...state,
        filter: state.search
          ? state.search.filter(
              (product: productType) => product.category === action.payload
            )
          : [],
      };
    case Types.FilteredData:
      return {
        ...state,
        filter: action.payload,
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
