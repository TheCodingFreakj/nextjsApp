import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { getBusinessDetails } from "../../actions/user";
const Popup = ({ closePopup, loggedinUser }) => {
  //console.log(loggedinUser);

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

  const showRegistrationForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onEdit(e)}>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Tell us Who are you ?"
            name="description"
            value={description || ""}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <button
            onClick={() => toggledisplayAddressInputs(!displayAddressInputs)}
            type="button"
            className="btn btn-success"
          >
            Update Address Information
          </button>
        </div>

        {displayAddressInputs && (
          <React.Fragment>
            <div className="form-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Your Location Please"
                name="location"
                value={location || ""}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your City Name Please"
                name="city"
                value={city || ""}
                onChange={(e) => onChange(e)}
                //onChange={onChange("city")}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Region Please"
                name="region"
                value={region || ""}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Give us the exact pincode"
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
          <input
            type="text"
            className="form-control"
            placeholder="Your Phone Number Please"
            name="phone"
            value={phone || ""}
            onChange={(e) => onChange(e)}
            //onChange={onChange("phone")}
            required
          />
        </div>

        <div>
          <input type="submit" className="btn btn-success" value="Done" />
        </div>
      </form>
    );
  };
  return (
    <div className="popup">
      <div className="popup_inner">
        {showRegistrationForm()}
        <Button onClick={closePopup}>X</Button>
      </div>
    </div>
  );
};

export default Popup;
