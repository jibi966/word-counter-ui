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

export const handleFavorite = (id, val) => (dispatch) => {
  let newVal;
  if (val === "No") {
    newVal = "Yes";
  } else {
    newVal = "No";
  }
  axios
    .put(`http://localhost:3030/update/${id}`, {
      favorite: newVal,
    })
    .then(() => {
      axios.get("http://localhost:3030").then((res) => {
        dispatch(getAll(res.data));
      });
    });
};

export const handlePostingData = (value) => (dispatch) => {
  axios
    .post("http://localhost:3030/create", {
      url: value,
    })
    .then(() => {
      axios.get("http://localhost:3030").then((res) => {
        dispatch(getAll(res.data));
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const deletingData = (id) => (dispatch) => {
  axios.delete(`http://localhost:3030/remove/${id}`).then(() => {
    console.log("Deleted");
    dispatch(getAllData());
  });
};
