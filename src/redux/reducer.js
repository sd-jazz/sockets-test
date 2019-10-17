const initialState = {
  user: {
    user_id: null,
    auth0_id: "",
    profile_name: "",
    email: "",
    picture: ""
  },
  room_name: ""
};

const GET_USER = "GET_USER";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user
  };
}

export default reducer;
