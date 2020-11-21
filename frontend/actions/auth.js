//import fetch from "isomorphic-fetch";
import axios from "axios";
import { API } from "../config";
import { removeCookie, removeLocatStorage } from "./setAuthToken";
//import setAuthTokenLocalStorage from "../actions/setAuthTokenLocalStorage";

export const signup = async (newUser) => {
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const body = JSON.stringify(newUser);

    const response = await axios.post(`${API}/api/sign-up`, body, config); //handing the backedn register user
    return response.data;
    console.log(response.data); // this is the token from backend
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    //we can use this token to access protected routes
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error

      return error.message;
      console.log("Error", error.message);
    }
  }
};

//Load The User

export const signin = async (user) => {
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const body = JSON.stringify(user);
    const response = await axios.post(
      "http://localhost:8000/api/sign-in",
      body,
      config
    );
    return response.data;
    console.log(response.data); // this is the token from backend
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    //we can use this token to access protected routes
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
      console.log("Error", error.message);
    }
  }
};

export const signout = async (next) => {
  removeCookie("token");
  removeLocatStorage("user");

  next();

  const config = {
    method: "GET",
  };

  try {
    await axios.get(`${API}/api/sign-out`, config);
    console.log("Signout successful");
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const authencticateUser = async (token) => {
  const config = {
    method: "GET",
  };

  try {
    await axios.get(`${API}/api/sign-in`, config, token);
    console.log("update successful");

    return response.data;
    console.log(response.data); // this is the token from backend
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
      console.log("Error", error.message);
    }
  }
};
