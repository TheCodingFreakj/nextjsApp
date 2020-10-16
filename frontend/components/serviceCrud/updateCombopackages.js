// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Router from "next/router";
// import { isAuth, getCookie } from "../../actions/setAuthToken";
// //get the service price
// import { withRouter } from "next/router";
// import { API } from "../../config";

// import { getAllTools } from "../../actions/tools";
// import { updatePackage, singlePackage } from "../../actions/comboPackage";
// const UpdatePackages = ({ router }) => {
//     //console.log("This is router object", router);
//     //getting all values from form inputs
//     const [values, setValues] = useState({
//       serviceName: "",
//       duration: "",
//       summary: "",
//       formData: "",
//       process: "",
//       error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
//       success: false, //Shows up as a display message when we submit somthing
//       loading: false,
//       reload: false,
//     });

//     const {
//       serviceName,
//       duration,
//       summary,
//       process,
//       formData,
//       error,
//       loading,
//       reload,
//     } = values;

//     //state to get the tools from backend
//     const [tools, setTools] = useState([]);
//     const [discountedPrice, setDiscountedPrice] = useState([]);

//     //state to get the checkedTool value in the state at the frontend
//     const [checkedTool, setCheckedTool] = useState([]);
//     // console.log("This is the state where I store the checkedTool", checkedTool);
//     const [checkedPrice, setCheckedPrice] = useState([]);

//     useEffect(() => {
//       // const checkedData = new FormData();
//       setValues({ ...values, formData: new FormData() });
//       initService();
//       //make  the formdata availabk\le

//       initServicePrices();
//       initTools();
//     }, [router]);

//     const token = getCookie("token");
//     console.log(router.query.slug);
//     const initService = () => {
//       if (router.query.slug) {
//         singleService(router.query.slug).then((data) => {
//           console.log(data);
//           if (data.error) {
//             console.log(error);
//           } else {
//             setValues({
//               ...values,
//               serviceName: data.title,
//               duration: data.duration,
//               summary: data.summary,

//               process: data.process,
//             });

//             setdiscountPriceArray(data.discountedServiceCharges);
//             setToolsArray(data.tools);
//           }
//         });
//       }
//     };

//     const setdiscountPriceArray = (servicePrices) => {
//       console.log(servicePrices);
//       let serviceArray = [];
//       servicePrices.map((price, i) => {
//         //console.log(price);
//         serviceArray.push(price._id);
//       });

//       setCheckedPrice(serviceArray);
//     };

//     const setToolsArray = (toolsData) => {
//       let toolsArray = [];
//       toolsData.map((tool, i) => {
//         toolsArray.push(tool._id);
//       });

//       setCheckedTool(toolsArray);
//     };

//     const initServicePrices = () => {
//       getAllServicePriceOptions().then((data) => {
//         //console.log("The price tag is", data);
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           setDiscountedPrice(data);
//         }
//       });
//     };

//     const initTools = () => {
//       getAllTools().then((data) => {
//         //console.log("The price tag is", data);
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           setTools(data);
//         }
//       });
//     };

//     //This is a function returning another function

//     const onChange = (name) => (e) => {
//       // console.log("The current input is", e.target.value);
//       // console.log("The name is ", name);

//       // const value = e.target.value;

//       const value = name === "photo" ? e.target.files[0] : e.target.value;

//       // console.log(value);

//       formData.set(name, value);

//       //after populating we have to update the state
//       setValues({ ...values, [name]: value, formData: formData, error: "" });
//     };

//     const handleToggle = (tId) => {
//       //clear the state incase of any error
//       setValues({ ...values, error: "" });
//       const clickedTool = checkedTool.indexOf(tId);

//       //storing all the checked Values in allTools
//       const allTools = [...checkedTool];

//       if (clickedTool === -1) {
//         allTools.push(tId);
//       } else {
//         allTools.splice(clickedTool, 1);
//       }
//       // console.log("Storing all the check Items in a variable", allTools);
//       setCheckedTool(allTools); // storing all checked value in the state

//       formData.set("tools", allTools);
//     };

//     const findOutTools = (toolId) => {
//       const result = checkedTool.indexOf(toolId);
//       if (result !== -1) {
//         return true;
//       } else {
//         return false;
//       }
//     };

//     const showTools = () => {
//       return tools.map((tool, i) => (
//         <li key={i} className="list-unstyled">
//           <input
//             onChange={() => handleToggle(tool._id)}
//             checked={findOutTools(tool._id)}
//             type="checkbox"
//             className="mr-2"
//           />
//           <label className="form-check-label">{tool.tool}</label>
//         </li>
//       ));
//     };

//     const handlePriceToggle = (pId) => {
//       //clear the state incase of any error
//       setValues({ ...values, error: "" });
//       const clickedPrice = checkedPrice.indexOf(pId);

//       //storing all the checked Values in allTools
//       const choosenPrices = [...checkedPrice];

//       if (clickedPrice === -1) {
//         choosenPrices.push(pId);
//       } else {
//         choosenPrices.splice(checkedPrice, 1);
//       }
//       console.log("Storing all the check Items in a variable", choosenPrices);
//       setCheckedPrice(choosenPrices); // storing all checked value in the state

//       formData.set("discountedPrice", choosenPrices);
//     };

//     const findOutServicePrices = (priceId) => {
//       const result = checkedPrice.indexOf(priceId);
//       if (result !== -1) {
//         return true;
//       } else {
//         return false;
//       }
//     };

//     const showDiscountedPrice = () => {
//       return discountedPrice.map((price, i) => (
//         <li key={i} className="list-unstyled">
//           <input
//             onChange={() => handlePriceToggle(price._id)}
//             checked={findOutServicePrices(price._id)}
//             type="checkbox"
//             className="mr-2"
//           />
//           <label className="form-check-label">
//             <h5>{price.serviceName}</h5>
//             {price.discountedServiceCharges}
//           </label>
//         </li>
//       ));
//     };

//     const showError = () => (
//       <div
//         className="alert alert-danger"
//         style={{ display: error ? "" : "none" }}
//       >
//         {error}
//       </div>
//     );

//     const showSuccess = () => (
//       <div
//         className="alert alert-success"
//         style={{ display: success ? "" : "none" }}
//       >
//         {success}
//       </div>
//     );

//     const editPackage = (e) => {
//         e.preventDefault();
//         console.log("The Form Is Submitted");

//         const newComboPackagePrice = {
//           realPackagePrice,
//           packageDiscountPrice,
//           packageName,
//         };

//         updatePackage(newComboPackagePrice, router.query.slug, token).then((data) => {
//           //console.log(data);
//           if (data.error) {
//             setpackagePrice({ ...values, error: data.error, success: false });
//           } else {
//             setpackagePrice({
//               ...packagePrice,
//               realPackagePrice: "",
//               packageDiscountPrice: "",
//               discountedPackageCharges: "",
//               error: false,
//               success: true,
//               loading: false,
//               reload: true,
//             });
//           }
//         });
//     };

//     const updatePackageForm = () => {
//         return (
//           <form onSubmit={(e) => editPackage(e)}>
//             <div className="form-group">
//               <label className="text-muted">Real Package Price </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="realPackagePrice"
//                 onChange={onChange("realPackagePrice")}
//                 value={realPackagePrice}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="text-muted"> Discount Package Charges </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="packageDiscountPrice"
//                 onChange={onChange("packageDiscountPrice")}
//                 value={packageDiscountPrice}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="text-muted">Package Name </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="packageName"
//                 onChange={onChange("packageName")}
//                 value={packageName}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-success">
//               Update
//             </button>
//           </form>
//         );

//     };
//   return (
//     <React.Fragment>

//       <div className="container-fluid pb-5 ">
//         <div className="row">
//           <div className="col-md-8 pb-5">

//             {updatePackageForm()}

//       </div>

//       </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default withRouter(UpdatePackages);
