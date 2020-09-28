import axios from "axios";
import { API } from "../config";

export const createNewPrice = async (newPriceInfo, token) => {
  console.log("This is newPrice object", newPriceInfo);
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
        //"Content-type": "application/json",
        //mode: "cors",
        //credentials: "include",
        // "Access-Control-Allow-Headers": "Accept",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const body = JSON.stringify(newPriceInfo);
    console.log("This is the body send", body);
    //Fine;

    const response = await axios.post(`${API}/api/price`, body, config); //handing the backedn register user
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
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};

//get the tool info and client price to display
export const getAllServicePriceOptions = async () => {
  try {
    const config = {
      method: "GET",
    };

    const response = await axios.get(`${API}/api/get-price`, config); //handing the backedn register user
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
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};

//get the tool info and client price to display
export const getAllPackagePriceOptions = async () => {
  try {
    const config = {
      method: "GET",
    };

    const response = await axios.get(`${API}/api/get-combo-price`, config); //handing the backedn register user
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
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
