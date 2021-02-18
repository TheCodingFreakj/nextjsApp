import React, { useState, useEffect } from "react";
import "../../../static/styles.css";
const AddressConfirmationSwitch = (props) => {
  useEffect(() => {
    // console.log("This is running");

    //we set state of mounted to true.
    const mounted = { current: true };

    if (mounted.current) {
      // const getCustomerBusinessDetails = async () => {
      //   await getBusinessDetails(token).then((data) => {

      //   });
      // };
      // getCustomerBusinessDetails();

      console.log("This is to be done");
      //call the customer function get the address and number
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      <>
        <form className="modal-window-inner">
          <button className="button-modal" onClick={props.closeModal}>
            close
          </button>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm location"
              // value={password} // grab the init value from formData
              // onChange={onChange("password")}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm region"
              // value={password} // grab the init value from formData
              // onChange={onChange("password")}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm city"
              // value={password} // grab the init value from formData
              // onChange={onChange("password")}
              required
            />
          </div>

          <div className="form-group">
            {" "}
            <input
              type="text"
              className="inner-form"
              placeholder="Confirm pinCode"
              // value={password} // grab the init value from formData
              // onChange={onChange("password")}
              required
            />
          </div>

          <div className="form-group">
            {" "}
            <input
              type="number"
              className="inner-form"
              placeholder="Confirm phone"
              // value={password} // grab the init value from formData
              // onChange={onChange("password")}
              required
            />
          </div>
        </form>
      </>
    </React.Fragment>
  );
};

export default AddressConfirmationSwitch;
