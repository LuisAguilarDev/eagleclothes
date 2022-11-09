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
}
export type ProductPayload = {
  [Types.Add]: productType;
  [Types.Delete]: productType;
  [Types.ClearCart]: [];
  [Types.SetQuantity]: number;
  [Types.GetCart]: productType[];
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
export type paginationType = {
  currentPage: number;
  lastPage: number;
};
export type InitialStateType = {
  loading: boolean;
  shoppingCart: productType[];
  search?: productType[];
  pagination?: paginationType;
  favorites?: productType[];
  quantity: number;
};
