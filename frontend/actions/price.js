// import axios from "axios";
// import { API } from "../config";

// export const createNewPrice = async (newPriceInfo, token) => {
//   try {
//     const config = {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: ` Bearer ${token}`,
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       },
//     };

//     const body = JSON.stringify(newPriceInfo);
//     console.log(body);
//     //Fine;

//     const response = await axios.post(`${API}/api/createPrice`, body, config); //handing the backedn register user
//     return response.data;
//     console.log(response.data); // this is the token from backend
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//     //we can use this token to access protected routes
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//   }
// };

// //get the tool info and client price to display
// export const getAllServicesOptions = async (token) => {
//   try {
//     const config = {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: ` Bearer ${token}`,
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       },
//     };

//     const response = await axios.get(`${API}/api/get-price-list`, config); //handing the backedn register user
//     return response.data;
//     console.log(response.data); // this is the token from backend
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//     //we can use this token to access protected routes
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//   }
// };
