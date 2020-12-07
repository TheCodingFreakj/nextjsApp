import axios from "axios";
import { API } from "../config";
// const stripe = Stripe(
//   "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
// );
export const createSubsription = async (paymentData, token) => {
  console.log(paymentData);
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const body = JSON.stringify(paymentData);
    console.log(body);

    const response = await axios.post(
      `${API}/api/subscribe-services`,
      body,
      config
    ); //handing the backedn register user
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

export const subscribesession = async (paymentData, token) => {
  console.log(paymentData, " ", token);
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    };

    const body = JSON.stringify(paymentData);

    const response = await axios.post(
      `${API}/api/subscribe-session`,
      body,
      config
    ); //handing the backedn register user
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
