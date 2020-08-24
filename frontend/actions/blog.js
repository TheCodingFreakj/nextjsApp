import axios from "axios";
import { API } from "../config";

//This is the input I am getting from the createBlogForm() after submit
//formData, getCookie("token")
export const createBlog = async (blog, token) => {
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

    const body = blog; //we are sending the formData to get posted on the backend

    const response = await axios.post(`${API}/api/blog`, body, config); //handing the backedn register user
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

export const listBlogsWithCategoriesNTags = async () => {
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    // const body = blog;

    const response = await axios.post(
      `${API}/api/blogs-categories-tags`,
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
