import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  products: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.ADD_PRODUCT:
      const stateNew = [...state.products, payload];
      return { ...state, products: stateNew };
    case ActionTypes.DELETE_PRODUCT:
      const state1 = [...state.products];
      const stateDeleted = state1.filter(
        (item) => item.id !== parseInt(payload)
      );
      return { ...state, products: stateDeleted };
    case ActionTypes.UPDATE_PRODUCT:
      const stateEdit = [...state.products];
      const stateEdited = stateEdit.map((item) =>
        item.id === payload.id ? (item = { ...item, ...payload }) : item
      );
      console.log(">>>check update: ", stateEdited);
      return { ...state, products: stateEdited };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
