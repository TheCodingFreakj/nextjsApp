import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createServices } from "../../actions/services";
import { getAllServicePriceOptions } from "../../actions/price";
import { getAllTools } from "../../actions/tools";

const CreateServices = ({ router }) => {
  //getting all values from form inputs
  const [values, setValues] = useState({
    serviceName: "",
    duration: "",
    summary: "",
    formData: "",
    process: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });

  const {
    serviceName,
    duration,
    summary,
    process,
    formData,
    error,
    loading,
    reload,
  } = values;

  //state to get the tools from backend
  const [tools, setTools] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState([]);

  //state to get the checkedTool value in the state at the frontend
  const [checkedTool, setCheckedTool] = useState([]);
  // console.log("This is the state where I store the checkedTool", checkedTool);
  const [checkedPrice, setCheckedPrice] = useState([]);

  useEffect(() => {
    // const checkedData = new FormData();
    setValues({ ...values, formData: new FormData() });
    showToolSideBar();
    showPriceSideBar();
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

  const showPriceSideBar = () => {
    getAllServicePriceOptions().then((data) => {
      //console.log("The price tag is", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setDiscountedPrice(data);
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

  const handlePriceToggle = (pId) => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    const clickedPrice = checkedPrice.indexOf(pId);

    //storing all the checked Values in allTools
    const choosenPrices = [...checkedPrice];

    if (clickedPrice === -1) {
      choosenPrices.push(pId);
    } else {
      choosenPrices.splice(checkedPrice, 1);
    }
    console.log("Storing all the check Items in a variable", choosenPrices);
    setCheckedPrice(choosenPrices); // storing all checked value in the state

    formData.set("discountedPrice", choosenPrices);
  };

  const showDiscountedPrice = () => {
    return discountedPrice.map((price, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handlePriceToggle(price._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">
          <h5>
            {price.serviceName}: {price.discountedServiceCharges}
          </h5>
        </label>
      </li>
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createServices(formData, token).then((data) => {
      //console.log("This is getting from backend", data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          serviceName: "",
          duration: "",
          process: "",
          summary: "",
          error: "",
          success: `A new service :"${data.serviceName}" is created `,
        });
      }
    });
  };

  const createServiceForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h3>Service Packages </h3>
        </label>

        <div className="form-group">
          <select
            name="serviceName"
            className="form-control"
            type="text"
            value={serviceName}
            onChange={onChange("serviceName")}
          >
            <option value="0">* Select Service Packages</option>
            <option value="Content-Marketing">Content-Marketing</option>
            <option value="seo">Seo</option>
            <option value="Funnel-Marketing">Funnel-Marketing</option>
            <option value="Static-Websites">Static-Websites</option>
            <option value="Single-Page-Website">Single-Page-Website</option>
            <option value="Ecommerce-Websites">Ecommerce-Websites</option>
            <option value="Author-Websites">Author-Websites</option>
            <option value="Resturant-Websites">Resturant-Websites</option>
            <option value="Corporate-Websites">Corporate-Websites</option>
            <option value="Personal-Blogs">Personal-Blogs</option>
            <option value="Mobile-Apps">Mobile-Apps</option>
            <option value="Email-Marketing">Email-Marketing</option>
            <option value="Facebook-Marketing">Facebook-Marketing</option>
            <option value="Custom-Website-Design">Custom-Website-Design</option>
            <option value="Wordpress-Website">Wordpress-Website </option>
          </select>
        </div>

        <label className="text-muted">
          <h3>Brief Summarry</h3>
        </label>
        <div className="form-group">
          <input
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
            <h3>Duration</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Duration Here"
            value={duration}
            onChange={onChange("duration")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Process</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            value={process}
            onChange={onChange("process")}
            required
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
            <div className="col-md-8 pb-5">
              <div>
                <h5>Select Service and Discounted Price</h5>
                <ul
                  style={{
                    maxHeight: "300px",
                    overflowY: "scroll",
                  }}
                >
                  {showDiscountedPrice()}
                </ul>

                <hr />
              </div>
            </div>
            {createServiceForm()}
            {/* {JSON.stringify(discountedPrice)} */}
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CreateServices);
