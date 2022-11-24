type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export enum Types {
  Delete = "DELETE_PRODUCT",
  Add = "ADD_TO_CART",
  Update = "UPDATE_STATE",
  ClearCart = "CLEAR_CART",
  SetQuantity = "SET_QUANTITY",
  GetCart = "GET_CART",
  Search = "SEARCH_PRPDUCTS",
  GetFavs = "GET_FAVS",
  DeleteFav = "DELETE_FAV",
  FilterPrice = "FILTER_BY_PRICE",
  FilterCategory = "FILTER_BY_CATEGORY",
  GetAddress = "GET_ADDRESS",
  Loading = "LOADING_STATE",
  FilteredData = "FILTERED_DATA",
  GetOrders = "GET_ORDERS",
}
export type ProductPayload = {
  [Types.Add]: productType;
  [Types.Delete]: productType;
  [Types.ClearCart]: [];
  [Types.SetQuantity]: number;
  [Types.GetCart]: productType[];
  [Types.Search]: productType[];
  [Types.GetFavs]: productType[];
  [Types.DeleteFav]: productType;
  [Types.FilterPrice]: number;
  [Types.FilterCategory]: string;
  [Types.FilteredData]: productType[];
  [Types.Loading]: boolean;
  [Types.GetAddress]: Address[];
  [Types.GetOrders]: any[];
};
export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export type ShoppingCartActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export type productType = {
  quantity?: number;
  category: string;
  code: string;
  name: string;
  pk: number;
  price: {
    value: number;
    formattedValue: string;
  };
  variantSizes: [{ filtercode: string }];
  color: [string];
  colorName: [string];
  galleryImages: [{ url: string }];
  images: string;
};

export type InitialStateType = {
  loading: boolean;
  search?: productType[];
  filter?: productType[];
  favorites?: productType[];
  quantity: number;
  address: Address[];
};

export type Address = {
  Address: string;
  City: string;
  Country: string;
  Telephone_number: string;
  ZIP_CODE: string;
};
