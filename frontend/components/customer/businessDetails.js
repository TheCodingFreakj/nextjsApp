import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { isAuth } from "../../actions/setAuthToken";
import { getBusinessDetails } from "../../actions/user";
import EditBusinessDetails from "../../components/customer/editBusinessDetails";

const BusinessDetailsForms = ({ router }) => {
  //getting all values from form inputs
  const [values, setValues] = useState({
    location: "",
    place: "",
    city: "",
    pinCode: "",
    phone: "",
    description: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });
  // {
  //   console.log(isAuth());
  // }
  const {
    location,
    region,
    city,
    description,
    pinCode,
    phone,
    error,
    loading,
    reload,
  } = values;

  const [displayAddressInputs, toggledisplayAddressInputs] = useState(false);

  const token = getCookie("token");

  const onChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //     address.city
    // string
    // City, district, suburb, town, or village.

    // address.country
    // string
    // Two-letter country code (ISO 3166-1 alpha-2).

    // address.line1
    // string
    // Address line 1 (e.g., street, PO Box, or company name).

    // address.line2
    // string
    // Address line 2 (e.g., apartment, suite, unit, or building).

    // address.postal_code
    // string
    // ZIP or postal code.

    // address.state
    // string
    // State, county, province, or region.

    const formData = {
      location,
      region,
      city,
      description,
      pinCode,
      phone,
    };
    getBusinessDetails(formData, token).then((data) => {
      console.log("This is getting from backend", data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          location: "",
          description: "",
          region: "",
          city: "",
          formData: "",
          pinCode: "",
          phone: "",
          error: "false",
          success: `A new service :"${data.serviceName}" is created `,
        });
      }
    });
  };

  const createBusinessDetailsForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">
            <h3>Description</h3>
          </label>

          <textarea
            type="text"
            className="form-control"
            placeholder="Input the Duration Here"
            name="description"
            value={description || ""}
            onChange={(e) => onChange(e)}
            //onChange={onChange("description")}
            required
          />
        </div>

        <div className="form-group">
          <button
            onClick={() => toggledisplayAddressInputs(!displayAddressInputs)}
            type="button"
            className="btn btn-success"
          >
            Add Address Information
          </button>
        </div>

        {displayAddressInputs && (
          <React.Fragment>
            <div className="form-group">
              <label className="text-muted">
                <h3>Street Number</h3>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Input the Duration Here"
                name="location"
                value={location || ""}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                <h3>City</h3>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Input the Process Here"
                name="city"
                value={city || ""}
                onChange={(e) => onChange(e)}
                //onChange={onChange("city")}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                <h3>State/Province/Region</h3>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Input the Process Here"
                name="region"
                value={region || ""}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                <h3>Pin Code</h3>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Input the Process Here"
                name="pinCode"
                value={pinCode || ""}
                onChange={(e) => onChange(e)}
                // onChange={onChange("pinCode")}
                required
              />
            </div>
          </React.Fragment>
        )}

        <div className="form-group">
          <label className="text-muted">
            <h3>Phone</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            name="phone"
            value={phone || ""}
            onChange={(e) => onChange(e)}
            //onChange={onChange("phone")}
            required
          />
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-success"
            value="Add Address"
          />
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="row">
          <div className="col-md-6 pb-5">
            {createBusinessDetailsForm()}
            {/* {JSON.stringify(users)} */}
          </div>
          <div className="col-md-6 pb-5">
            <EditBusinessDetails />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

//This picks a logged in user

export default withRouter(BusinessDetailsForms);
