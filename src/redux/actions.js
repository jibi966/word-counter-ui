import axios from "axios";

export const GET_ALL = "GET_ALL";

const getAll = (data) => {
  return {
    type: GET_ALL,
    payload: data,
  };
};

export const getAllData = () => (dispatch) => {
  axios.get("http://localhost:3030").then((res) => {
    dispatch(getAll(res.data));
  });
};
