import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { isAuth } from "../../actions/setAuthToken";
import { getBusinessDetails, getCurrentCustomer } from "../../actions/user";

const EditBusinessDetails = ({ router }) => {
  console.log(isAuth());
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
  const token = getCookie("token");

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
  useEffect(() => {
    getCurrentCustomer(isAuth().username, token).then((data) => {
      console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          description: data.description,
          phone: data.phone,
          location: data.address[0].location,
          region: data.address[0].region,
          city: data.address[0].city,
          pinCode: data.address[0].pinCode,
        });
      }
    });
  }, [router]);

  const [displayAddressInputs, toggledisplayAddressInputs] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onEdit = (e) => {
    e.preventDefault();

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
      <form className="text-center" onSubmit={(e) => onEdit(e)}>
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
          <div className="col-md-8 pb-5">
            {createBusinessDetailsForm()}
            {/* {JSON.stringify(users)} */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

//This picks a logged in user

export default withRouter(EditBusinessDetails);
