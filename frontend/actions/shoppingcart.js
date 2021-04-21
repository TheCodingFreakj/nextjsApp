import axios from "axios";
import { API } from "../config";
import { isAuth, getCookie } from "../actions/setAuthToken";
export const updateToolCart = async (quantity, productId, token) => {
  try {
    const config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const payload = { quantity, productId }; //we are sending the formData to get posted on the backend

    console.log(payload);
    const response = await axios.put(`${API}/api/tools-cart`, payload, config); //handing the backedn register user
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
      console.log(error.response.data); //show this data in frontend
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
      console.log("Error", error.message);
    }
  }
};

export const deleteToolsCart = async (productId, token) => {
  // console.log(productId);
  try {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${API}/api/tools-cart/${productId}`,
      payload,
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

export const deleteServiceCart = async (serviceId, token) => {
  console.log(serviceId, "", token);
  try {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${API}/api/services-cart?${serviceId}`,
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

export const updateServicesCart = async (quantity, serviceId, token) => {
  try {
    const config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const payload = { quantity, serviceId }; //we are sending the formData to get posted on the backend

    console.log(payload);
    const response = await axios.put(
      `${API}/api/services-cart`,
      payload,
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

      return error.response.data;
      console.log(error.response.data); //show this data in frontend
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
      console.log("Error", error.message);
    }
  }
};

export const getToolsCart = async (token) => {
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API}/api/tools-cart`, config); //handing the backedn register user
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

export const getServicesCart = async () => {
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API}/api/services-cart`, config); //handing the backedn register user
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

export const fetchCarts = async (token) => {
  try {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API}/api/fetch-cart`, config); //handing the backedn register user
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

export const createOrders = async (paymentData, token) => {
  console.log(paymentData);
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const response = await axios.post(
      `${API}/api/get-order-details`,
      paymentData,
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
      return error.response.data;
      console.log(error.response.data); //show this data in frontend
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
      console.log("Error", error.message);
    }
  }
};
