import axios from "axios";

export const GET_ALL = "GET_ALL";

const getAll = (data) => {
  return {
    type: GET_ALL,
    payload: data,
  };
};

// dispatch for getAllData
export const getAllData = () => (dispatch) => {
  axios.get("https://mern-counter.herokuapp.com").then((res) => {
    dispatch(getAll(res.data));
  });
};

// dispatch for editing the content: ;
export const handleFavorite = (id, val) => (dispatch) => {
  let newVal;
  if (val === "No") {
    newVal = "Yes";
  } else {
    newVal = "No";
  }
  axios
    .put(`https://mern-counter.herokuapp.com/update/${id}`, {
      favorite: newVal,
    })
    .then(() => {
      axios.get("https://mern-counter.herokuapp.com").then((res) => {
        dispatch(getAll(res.data));
      });
    });
};

// dispatching for adding the data
export const handlePostingData = (value) => (dispatch) => {
  axios
    .post("https://mern-counter.herokuapp.com/create", {
      url: value,
    })
    .then(() => {
      axios.get("https://mern-counter.herokuapp.com").then((res) => {
        dispatch(getAll(res.data));
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

// dispatch for deleting the content: ;
export const deletingData = (id) => (dispatch) => {
  axios.delete(`https://mern-counter.herokuapp.com/remove/${id}`).then(() => {
    console.log("Deleted");
    dispatch(getAllData());
  });
};
