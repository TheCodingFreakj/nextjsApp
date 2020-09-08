import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const CreateServices = () => {
  //Do the brands and display it tom
  const showMarketingTools = () => {};

  const showBrands = () => {};
  const createServiceForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h3>Service Name</h3>
        </label>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            // name="title"
            // value={title} // This value should be coming from the state
            // onChange={onChange("title")} //setFormData
            // required
          />
        </div>

        <label className="text-muted">
          <h3>Brief Summarry</h3>
        </label>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            // name="title"
            // value={title} // This value should be coming from the state
            // onChange={onChange("title")} //setFormData
            // required
          />
        </div>

        <label className="text-muted">
          <h3>Discount Price </h3>
        </label>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            // name="title"
            // value={title} // This value should be coming from the state
            // onChange={onChange("title")} //setFormData
            // required
          />
        </div>

        <label className="text-muted">
          <h3>Price </h3>
        </label>
        {/* value={status} onChange={(e) => onChange(e)} */}
        <div className="form-group">
          <select name="status" className="form-control" type="text">
            <option value="0">* Select Service Packages</option>
            <option value="Content Marketing">Content Marketing</option>
            <option value="Seo">Seo</option>
            <option value="Funnel Marketing">Funnel Marketing</option>
            <option value="Static Websites">Static Websites</option>
            <option value="Single Page Website">Single Page Website</option>
            <option value="Erp Solutions">Erp Solutions</option>
            <option value="Author Websites">Author Websites</option>
            <option value="Resturant Websites">Resturant Websites</option>
            <option value="Corporate Websites">Corporate Websites</option>
            <option value="Personal Blogs">Personal Blogs</option>
            <option value="Mobile Apps">Mobile Apps</option>
          </select>
        </div>

        <label className="text-muted">
          <h3>Rating Average</h3>
        </label>

        <div className="form-group">
          <select name="status" className="form-control" type="text">
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

        <label className="text-muted">
          <h3>Ratings Quantity</h3>
        </label>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            // name="title"
            // value={title} // This value should be coming from the state
            // onChange={onChange("title")} //setFormData
            // required
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

export default CreateServices;

//https://draftjs.org/docs/quickstart-api-basics
//https://github.com/vercel/next.js/blob/canary/examples/with-draft-js/pages/index.js
//https://blog.learningdollars.com/2020/04/01/how-to-add-a-rich-text-editor-in-your-react-app-using-draft-js-and-react-draft-wysiwyg/
