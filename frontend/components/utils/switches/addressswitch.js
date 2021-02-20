import React, { useState, useEffect } from "react";
import "../../../static/styles.css";
import { getCurrentCustomer, getBusinessDetails } from "../../../actions/user";
import { getCookie } from "../../../actions/setAuthToken";
const AddressConfirmationSwitch = (props) => {
  const [values, setValues] = useState({
    phone: "",
    location: "",
    region: "",
    city: "",
    pinCode: "",
    email: "",
    formData: "",
    error: "",
  });

  const { phone, location, region, city, pinCode, email, error } = values;
  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      const getCustomerBusinessDetails = async () => {
        await getCurrentCustomer(getCookie("token")).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              location: data.address[0].location,
              region: data.address[0].region,
              city: data.address[0].city,
              pinCode: data.address[0].pinCode,
              phone: data.phone,
              email: data.email,
              error: "",
              formData: "",
              success: `A new service :"${data.serviceName}" is updated `,
            });
          }
        });
      };
      getCustomerBusinessDetails();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const onChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const onEdit = (e) => {
    e.preventDefault();

    const formData = {
      phone,
      location,
      region,
      city,
      pinCode,
      email,
    };
    getBusinessDetails(formData, getCookie("token")).then((data) => {
      //console.log("This is getting from backend", data);

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
          email: "",
          error: "false",
          success: `A new service :"${data.serviceName}" is created `,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <>
        <form className="modal-window-inner" onSubmit={(e) => onEdit(e)}>
          <button className="button-modal" onClick={props.closeModal}>
            close
          </button>

          <div className="form-group">
            <input
              type="email"
              className="inner-form"
              placeholder="Confirm email"
              value={email} // grab the init value from formData
              onChange={onChange("email")}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm location"
              value={location} // grab the init value from formData
              onChange={onChange("location")}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm region"
              value={region} // grab the init value from formData
              onChange={onChange("region")}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm city"
              value={city} // grab the init value from formData
              onChange={onChange("city")}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm pinCode"
              value={pinCode} // grab the init value from formData
              onChange={onChange("pinCode")}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="inner-form"
              placeholder="Confirm phone"
              value={phone} // grab the init value from formData
              onChange={onChange("phone")}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-success"
              value="update details"
            />
          </div>
        </form>
      </>
    </React.Fragment>
  );
};

export default AddressConfirmationSwitch;
