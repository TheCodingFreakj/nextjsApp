import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";

const CreateServices = ({ router }) => {
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

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const token = getCookie("token");

  const onSubmit = (e) => {
    e.preventDefault();

    createServices(formData, token).then((data) => {
      console.log(data);
      // if (data.error) {
      //   setValues({ ...values, error: data.error });
      // } else {
      //   setValues({
      //     ...values,
      //     title: "",
      //     error: "",
      //     success: `A new Blog title:"${data.title}" is created `,
      //   });

      //   setBody("");

      //   setChecked([]);
      //   setCheckedTag([]);
      //   setCategories([]);
      //   setTags([]);
      // }
    });
  };

  //This is a funxtion returi\ning another function

  const onChange = (name) => (e) => {
    console.log("The current input is", e.target.value);
    console.log([name]);

    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  //Do the brands and display it tom
  const showMarketingTools = () => {};

  const showBrands = () => {};
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
            onChange={(e) => onChange(e)}
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
            onchange="calculateTotal()"
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
            onChange={(e) => onChange(e)}
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
          <div className="col-md-8 pb-5">{createServiceForm()}</div>

          <div className="col-md-2 pb-5">
            <div>
              <div className="form-group pb-2">
                <h5>Featured Image</h5>
                <small className="text-muted">Max Size: 1mb</small>
                <label className="btn btn-outline-success">
                  Upload Featured Image
                  <input
                    // onChange={onChange("photo")}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            <div>
              <h5>Select Marketing Tools</h5>
              <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
                {showMarketingTools()}
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
// export default withRouter(BlogComponent);
export default withRouter(CreateServices);

//https://draftjs.org/docs/quickstart-api-basics
//https://github.com/vercel/next.js/blob/canary/examples/with-draft-js/pages/index.js
//https://blog.learningdollars.com/2020/04/01/how-to-add-a-rich-text-editor-in-your-react-app-using-draft-js-and-react-draft-wysiwyg/
