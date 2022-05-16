import { combineReducers } from "redux";
import { GET_ALL } from "./actions";

const initialState = {
  urlData: [],
};

// creating the reducer
const getDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return { ...state, urlData: payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  getDataReducer,
});
