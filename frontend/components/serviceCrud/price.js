// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Router from "next/router";
// import { getCookie } from "../../actions/setAuthToken";
// import { createNewPrice } from "../../actions/price";

// const ServicePricesForm = () => {
//   const [values, setValues] = useState({
//     serviceName: "",
//     servicePrice: "",
//     duration: "",
//     error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
//     success: false, //Shows up as a display message when we submit somthing
//     loading: false,
//     reload: false,
//   });

//   const {
//     serviceName,
//     servicePrice,
//     duration,
//     error,
//     loading,
//     reload,
//   } = values;
//   const token = getCookie("token");

//   //   useEffect(() => {
//   //     loadServiceOptions(); //this funxtion sewnd a req to backend to get the tool details
//   //   }, [reload]);

//   //   const loadTools = () => {
//   //     getAllServicesOptions().then((data) => {
//   //       console.log(data);
//   //       if (data.error) {
//   //         console.log(data.error);
//   //       } else {
//   //         //store what you got in the state
//   //         setValues({ ...values, toolArrayToShow: data });
//   //         // getToolDetails(token).then((data) => {
//   //         //   console.log(data);
//   //         //   if (data.error) {
//   //         //     console.log(data.error);
//   //         //   } else {
//   //         //     setValues({ ...values, priceArrayToshow: data });
//   //         //   }
//   //         // });
//   //       }
//   //     });
//   //   };

//   const onChange = (name) => (e) => {
//     // console.log("The current input is", e.target.value);
//     // console.log([name]);
//     setValues({
//       ...values,
//       [name]: e.target.value,
//       error: false,
//       success: false,
//       removed: "",
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log("The Form Is Submitted");

//     setValues({ ...values, loading: true, error: false });

//     const newPriceInfo = {
//       serviceName,
//       servicePrice,
//       duration,
//     };

//     //call the frontend action where you write frontend logic to create tools category

//     createNewPrice(newPriceInfo, token).then((data) => {
//       console.log(data);
//       // if (data.error) {
//       //   //setvalues fill the error variable and turn off the success

//       //   setValues({ ...values, error: data.error, success: false });
//       // } else {
//       //   //turn all off and make the success true

//       //   setValues({
//       //     ...values,
//       //     error: false,
//       //     success: true,
//       //     serviceName: "",
//       //     removed: false,
//       //     reload: true,
//       //   });
//       // }
//     });
//   };

//   //   const deleteConfirm = (slug) => {
//   //     let answer = window.confirm("Are you sure you want to delete me? ");
//   //     // const categories = categories.filter(cat => cat.id !== itemId);
//   //     if (answer) {
//   //       //console.log(slug);
//   //       deleteTool(slug);
//   //     }
//   //   };

//   //   const deleteTool = (slug) => {
//   //     removeSingleTool(slug, token).then((data) => {
//   //       // console.log(data);
//   //       if (data.error) {
//   //         console.log(data.error);
//   //       } else {
//   //         setValues({
//   //           ...values,
//   //           error: false,
//   //           success: false,
//   //           name: "",
//   //           removed: true,
//   //           reload: true,
//   //         });
//   //       }
//   //     });
//   //   };

//   //   const showTools = () => {
//   //     return toolArrayToShow.map((tool, i) => {
//   //       return (
//   //         <button
//   //           onDoubleClick={() => deleteConfirm(tool.slug)} //passing the slug we want to delete
//   //           value={tool.slug}
//   //           title="Double Click To Delete"
//   //           key={i}
//   //           className="btn btn-outline-primary mr-1 ml-1 mt-3"
//   //         >
//   //           {tool.tool}
//   //         </button>
//   //       );
//   //     });
//   //   };

//   const showSuccess = () => {
//     if (success) {
//       return <p className="text-success">Tool is Created</p>;
//     }
//   };

//   const showError = () => {
//     if (error) {
//       return <p className="text-danger">Tool is there already</p>;
//     }
//   };

//   const newServiceForm = () => {
//     return (
//       <form onSubmit={(e) => onSubmit(e)}>
//         <div className="form-group">
//           <label className="text-muted">Service Name </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Give the Service Name"
//             value={serviceName}
//             onChange={onChange("serviceName")}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="text-muted">Price</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Provide The Service Charges"
//             value={servicePrice}
//             onChange={onChange("servicePrice")}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="text-muted">Duration</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Input the Price Here"
//             value={duration}
//             onChange={onChange("duration")}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-danger">
//           Create Service
//         </button>
//       </form>
//     );
//   };

//   const mouseMoveHandler = (e) => {
//     setValues({ ...values, error: false, success: false, removed: "" });
//   };
//   return (
//     <React.Fragment>
//       {/* {showSuccess()}
//       {showError()} */}

//       {/* <hr />
//       {JSON.stringify(toolArrayToShow)}
//       <hr />
//       {JSON.stringify(priceArrayToshow)}
//       <hr /> */}
//       <div onMouseMove={mouseMoveHandler}>
//         {newServiceForm()}
//         {/* {showTools()} */}
//       </div>
//     </React.Fragment>
//   );
// };

// export default ServicePricesForm;
