import axios from "axios";
import { API } from "../config";

export const createNewTool = async (newTool, token) => {
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

    const body = JSON.stringify(newTool);
    //console.log(newTool); Fine

    const response = await axios.post(`${API}/api/createTools`, body, config); //handing the backedn register user
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

//this is to show all the tools
export const getAllTools = async () => {
  try {
    const config = {
      method: "GET",
    };

    const response = await axios.get(`${API}/api/getTools`, config); //handing the backedn register user
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
      console.log("The error object", error);
      console.log("Error", error.message);
    }
  }
};

export const getSingleTool = async (slug) => {
  try {
    const config = {
      method: "GET",
    };

    const response = await axios.get(`${API}/api/tool/${slug}`, config); //handing the backedn register user
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

export const removeSingleTool = async (slug, token) => {
  try {
    const config = {
      method: "DELETE",
      headers: {
        // Accept: "application/json",
        Authorization: ` Bearer ${token}`,
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const response = await axios.delete(`${API}/api/tool/${slug}`, config); //handing the backedn register user
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

export const updateToolPrice = async (formData, token, slug) => {
  console.log("This is the blog sent for update", formData);
  let updateEndPoint;
  try {
    updateEndPoint = `${API}/api/tool/${slug}`;

    // console.log(updateBlogsEndPoint);
    const config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const body = formData; //we are sending the formData to get posted on the backend
    const response = await axios.put(`${updateEndPoint}`, body, config); //handing the backedn register user
    return response.data;
    console.log("This is updated response for blog", response.data); // this is the token from backend
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
