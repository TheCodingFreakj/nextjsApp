import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createServices } from "../../actions/services";
import { getAllServicePriceOptions } from "../../actions/price";
import { getAllTools } from "../../actions/tools";
import dynamic from "next/dynamic"; //ReactQuill runs only on client side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateServices = ({ router }) => {
  const processFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("process")) {
      return JSON.parse(localStorage.getItem("process"));
    } else {
      return false;
    }
  };

  const [process, setProcess] = useState(processFromLS());

  const [values, setValues] = useState({
    serviceName: "",
    duration: "",
    summary: "",
    formData: "",
    error: false,
    success: false,
    loading: false,
    reload: false,
  });

  const {
    serviceName,
    duration,
    summary,
    formData,
    error,
    loading,
    reload,
  } = values;
  const [tools, setTools] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState([]);
  const [checkedTool, setCheckedTool] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    showToolSideBar();
    showPriceSideBar();
  }, [router]);

  const token = getCookie("token");

  const showToolSideBar = () => {
    getAllTools().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTools(data);
      }
    });
  };

  const showPriceSideBar = () => {
    getAllServicePriceOptions().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setDiscountedPrice(data);
      }
    });
  };

  //This is a function returning another function

  const onChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onHandleChange = (e) => {
    setProcess(e);
    formData.set("process", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("process", JSON.stringify(e));
    }
  };

  const handleToggle = (tId) => {
    setValues({ ...values, error: "" });
    const clickedTool = checkedTool.indexOf(tId);
    const allTools = [...checkedTool];

    if (clickedTool === -1) {
      allTools.push(tId);
    } else {
      allTools.splice(clickedTool, 1);
    }
    setCheckedTool(allTools);

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
    setValues({ ...values, error: "" });
    const clickedPrice = checkedPrice.indexOf(pId);
    const choosenPrices = [...checkedPrice];
    if (clickedPrice === -1) {
      choosenPrices.push(pId);
    } else {
      choosenPrices.splice(checkedPrice, 1);
    }
    console.log("Storing all the check Items in a variable", choosenPrices);
    setCheckedPrice(choosenPrices);

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
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          serviceName: "",
          duration: "",
          summary: "",
          error: "",
          success: `A new service :"${data.serviceName}" is created `,
        });

        setProcess("");
        setTools([]);
        setDiscountedPrice([]);
        setCheckedTool([]);
        setCheckedPrice([]);
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

          <div className="form-group">
            <ReactQuill
              value={process}
              placeholder="Write Somthing Amazing Here"
              modules={CreateServices.modules}
              formats={CreateServices.formats}
              onChange={(e) => onHandleChange(e)}
            />
          </div>
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

CreateServices.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

CreateServices.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(CreateServices);
