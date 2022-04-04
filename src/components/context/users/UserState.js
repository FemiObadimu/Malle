import { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";
// import setAuthHeader from "../../utils/setAuthHeader";

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
  SETTINGS_FAIL
} from "../types";

const UserState = (props) => {
  const initialState = {
    users1: null,
    current: null,
    singleUser: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  // Get Users
  const getUsers1 = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("https://reqres.in/api/users?page=1", config);

      dispatch({
        type: USERS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Create User

  const createUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "https://reqres.in/api/users",
        formData,
        config
      );

      dispatch({
        type: CREATE_SUCCESS,
        payload: res.data,
      });

      // loadUser();
    } catch (err) {
      dispatch({
        type: CREATE_FAIL,
        payload: err.response.msg,
      });
    }
  };

  // Delete User

  const removeUser = async (id) => {
    dispatch({
      type: DELETE_SUCCESS,
      payload: id,
    });
  };

  // Set Current  User

  const currentUser = async (person) => {
    dispatch({
      type: CURRENT_SUCCESS,
      payload: person,
    });
  };

  // Clear Current  User

  const clearCurrentUser = async () => {
    dispatch({
      type: CLEAR_SUCCESS,
    });
  };

  // Update Current  User

  const updateUser = async (person) => {
    dispatch({
      type: UPDATE_SUCCESS,
      payload: person,
    });
  };

  const updateSettings = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "https://reqres.in/api/login",
        formData,
        config
      );

      dispatch({
        type: SETTINGS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SETTINGS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        users1: state.users1,
        singleUser: state.singleUser,
        current: state.current,
        getUsers1,
        createUser,
        removeUser,
        currentUser,
        clearCurrentUser,
        updateUser,
        updateSettings
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
