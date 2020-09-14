import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createServices } from "../../actions/services";
import { getAllTools } from "../../actions/tools";

const CreateServices = ({ router }) => {
  //getting all values from form inputs
  const [values, setValues] = useState({
    serviceName: "",
    servicePrice: "",
    duration: "",
    ratingQuantity: "",
    summary: "",
    pricePercent: "",
    ratings: "",
    formData: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });

  const {
    serviceName,
    servicePrice,
    duration,
    pricePercent,
    ratingQuantity,
    summary,
    ratings,
    formData,
    error,
    loading,
    reload,
  } = values;

  //state to get the tools from backend
  const [tools, setTools] = useState([]);

  //state to get the checkedTool value in the state at the frontend
  const [checkedTool, setCheckedTool] = useState([]);
  // console.log("This is the state where I store the checkedTool", checkedTool);

  useEffect(() => {
    // const checkedData = new FormData();
    setValues({ ...values, formData: new FormData() });
    showToolSideBar();
  }, [router]);

  const token = getCookie("token");

  const showToolSideBar = () => {
    getAllTools().then((data) => {
      // console.log("This are all the tools I m getting from the backend", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTools(data);
      }
    });
  };

  //This is a function returning another function

  const onChange = (name) => (e) => {
    // console.log("The current input is", e.target.value);
    // console.log("The name is ", name);

    // const value = e.target.value;

    const value = name === "photo" ? e.target.files[0] : e.target.value;

    // console.log(value);

    formData.set(name, value);

    //after populating we have to update the state
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const handleToggle = (tId) => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    const clickedTool = checkedTool.indexOf(tId);

    //storing all the checked Values in allTools
    const allTools = [...checkedTool];

    if (clickedTool === -1) {
      allTools.push(tId);
    } else {
      allTools.splice(clickedTool, 1);
    }
    // console.log("Storing all the check Items in a variable", allTools);
    setCheckedTool(allTools); // storing all checked value in the state

    formData.set("tools", allTools);
  };

  const showTools = () => {
    return tools.map((tool, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handleToggle(tool._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{tool.tool}</label>
      </li>
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("The form is submitted");
    // console.log(formData.get("photo"));

    // console.log(
    //   "Getting everything in the formData",
    //   formData.get("checkedTool")
    // );
    createServices(formData, token).then((data) => {
      console.log("This is getting from backend", data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          serviceName: "",
          servicePrice: "",
          duration: "",
          pricePercent: "",
          ratingQuantity: "",
          summary: "",
          ratings: "",
          error: "",
          success: `A new service :"${data.serviceName}" is created `,
        });
      }
    });
  };

  //Do the brands and display it tom

  const showBrands = () => {};

  // const showSuccess = () => {
  //   if (success) {
  //     return <p className="text-success">Service is Created</p>;
  //   }
  // };

  // const showError = () => {
  //   if (error) {
  //     return <p className="text-danger">Service is there already</p>;
  //   }
  // };
  const createServiceForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h3>Service Packages </h3>
        </label>

        <div className="form-group">
          <select
            name="status"
            className="form-control"
            type="text"
            value={serviceName}
            onChange={onChange("serviceName")}
          >
            <option value="0">* Select Service Packages</option>
            <option value="contentMarketing">Content Marketing</option>
            <option value="seo">Seo</option>
            <option value="funnelMarketing">Funnel Marketing</option>
            <option value="StaticWebsites">Static Websites</option>
            <option value="singlePageWebsite">Single Page Website</option>
            <option value="ecommerceWebsites">Ecommerce Websites</option>
            <option value="Author Websites">Author Websites</option>
            <option value="resturantWebsites">Resturant Websites</option>
            <option value="corporateWebsites">Corporate Websites</option>
            <option value="personalBlogs">Personal Blogs</option>
            <option value="mobileApps">Mobile Apps</option>
          </select>
        </div>

        <label className="text-muted">
          <h3>Brief Summarry</h3>
        </label>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            name="summary"
            value={summary} // This value should be coming from the state
            onChange={onChange("summary")} //setFormData
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Price </h3>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Provide The Service Charges"
            value={servicePrice}
            onChange={onChange("servicePrice")}
            required
          />
        </div>

        <label className="text-muted">
          <h3>Discount Price </h3>
        </label>

        <div className="form-group">
          <select
            name="status"
            className="form-control"
            type="text"
            value={pricePercent}
            onChange={onChange("pricePercent")}
          >
            <option value="0">* Discount Percentage</option>
            <option value="10">10</option>
            <option value="10">15</option>
            <option value="10">20</option>
            <option value="10">21</option>
            <option value="10">25</option>
            <option value="10">30</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Duration</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Price Here"
            value={duration}
            onChange={onChange("duration")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Rating Average</h3>
          </label>
          <select
            name="status"
            className="form-control"
            type="text"
            value={ratings}
            onChange={onChange("ratings")}
          >
            <option value="0">* Ratings for the service package</option>
            <option value="4.0">4.0</option>
            <option value="4.1">4.1</option>
            <option value="4.2">4.2</option>
            <option value="4.3">4.3</option>
            <option value="4.4">4.4</option>
            <option value="4.5">4.5</option>
            <option value="4.6">4.6</option>
            <option value="4.7">4.7</option>
            <option value="4.8">4.8</option>
            <option value="4.9">4.9</option>
            <option value="5.0">5.0</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Ratings Quantity</h3>
          </label>

          <input
            type="text"
            className="form-control"
            name="ratingQuantity"
            value={ratingQuantity} // This value should be coming from the state
            onChange={onChange("ratingQuantity")} //setFormData
            //required
          />
        </div>

        <div>
          <input type="submit" className="btn btn-success" value="Submit" />
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="row">
          <div className="col-md-8 pb-5">
            {/* {showSuccess()}
            {showError()} */}
            {createServiceForm()}
            {/* {JSON.stringify(checkedTool)} */}
            {/* {JSON.stringify(allTools)} */}
          </div>

          <div className="col-md-2 pb-5">
            <div>
              <div className="form-group pb-2">
                <h5>Featured Image</h5>
                <small className="text-muted">Max Size: 1mb</small>
                <label className="btn btn-outline-success">
                  Upload Featured Image
                  <input
                    onChange={onChange("photo")}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            <div>
              <h5>Select Marketing Tools</h5>
              <ul style={{ maxHeight: "300px", overflowY: "scroll" }}>
                {showTools()}
              </ul>

              <hr />
            </div>

            <div>
              <h5>Select From Brands Worked</h5>
              <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
                {showBrands()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CreateServices);

//https://draftjs.org/docs/quickstart-api-basics
//https://github.com/vercel/next.js/blob/canary/examples/with-draft-js/pages/index.js
//https://blog.learningdollars.com/2020/04/01/how-to-add-a-rich-text-editor-in-your-react-app-using-draft-js-and-react-draft-wysiwyg/
