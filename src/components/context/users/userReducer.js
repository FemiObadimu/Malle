import {
  USERS_SUCCESS,
  USERS_FAIL,
  CREATE_SUCCESS,
  CREATE_FAIL,
  DELETE_SUCCESS,
  CURRENT_SUCCESS,
  CLEAR_SUCCESS,
  UPDATE_SUCCESS,
  SETTINGS_SUCCESS,
  SETTINGS_FAIL,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case USERS_SUCCESS:
      return {
        ...state,
        users1: action.payload,
      };

    case USERS_FAIL:
      return {
        ...state,
        users1: null,
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        singleUser: [...state.singleUser, action.payload],
      };
    case CREATE_FAIL:
      return {
        ...state,
        singleUser: [],
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        singleUser: state.singleUser.map((person, index) =>
          person.id === state.current.id
            ? state.singleUser.splice(index, 1) && [
                ...state.singleUser,
                state.current,
              ]
            : person
        ),
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        singleUser: state.singleUser.filter(
          (item) => item.id !== action.payload
        ),
      };

    case CURRENT_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        current: null,
      };

    case SETTINGS_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        token: action.payload.token,
      };

    case SETTINGS_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
