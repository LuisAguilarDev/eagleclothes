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
}
export type ProductPayload = {
  [Types.Add]: productType;
  [Types.Delete]: productType;
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
  shoppingCart: productType[];
  search?: productType[];
  pagination?: paginationType;
  favorites?: productType[];
};
