export const INITIAL_STATE = {
  loading: false,
  salesMen: [],
  search: [],
  pagination: [],
  salesWomen: [],
  favorites: [],
};

export const postReducer = (state: any, action: any) => {
  if (action.type === "INITIAL_FETCH") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "FAVORITES_FETCH") {
    return {
      ...state,
      favorites: action.payload,
    };
  }
  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      salesMen: [action.payload],
      loading: true,
    };
  }
  if (action.type === "FETCH_ERROR") {
    return {
      ...state,
      error: action.payload,
      loading: true,
    };
  }
  return state;
};
