import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewPrice } from "../../actions/price";

//bring components

const PriceForms = () => {
  const [serviceValues, setServiceValues] = useState({
    serviceName: "",
    realServicePrice: "",
    servicedDiscountPrice: "",
    serviceError: false,
    serviceSuccess: false,
    serviceLoading: false,
    serviceReload: false,
  });

  const {
    serviceName,
    realServicePrice,
    servicedDiscountPrice,
    serviceError,
    serviceSuccess,
    serviceLoading,
    serviceReload,
  } = serviceValues;

  useEffect(() => {
    //fill the state with new values
    //we are fill on the text data to the instance of this formData using set() in respective handlers and then send to the backedn
    setServiceValues({ ...serviceValues });
  }, []); //anytime the router change this useeffect will run

  const token = getCookie("token");

  const onChange = (name) => (e) => {
    const value = e.target.value;
    // console.log(value);
    setServiceValues({
      ...serviceValues,
      [name]: value, //keping the target values in state
      serviceError: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("This is onSubmit");
    const formData = {
      serviceName,
      realServicePrice,
      servicedDiscountPrice,
    };
    createNewPrice(formData, token).then((data) => {
      //console.log("This is getting from backend", data);
      if (data.error) {
        setServiceValues({
          ...serviceValues,
          serviceSuccess: false,
          serviceReload: false,
          serviceError: data.error,
        });
      } else {
        setServiceValues({
          ...serviceValues,
          serviceName: "",
          realServicePrice: "",
          servicedDiscountPrice: "",
          serviceError: "",
          serviceSuccess: `A new service :"${data.serviceName}" is created `,
          serviceLoading: false,
          serviceReload: true,
        });
      }
    });
  };
  const createServicePricingForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h4>Service Name </h4>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="serviceName"
            value={serviceName}
            onChange={onChange("serviceName")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Service Price </h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="realServicePrice"
            value={realServicePrice} // This value should be coming from the state
            onChange={onChange("realServicePrice")} //setFormData
            required
          />
        </div>

        <label className="text-muted">
          <h4>Discount Price </h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="servicedDiscountPrice"
            value={servicedDiscountPrice} // This value should be coming from the state
            onChange={onChange("servicedDiscountPrice")} //setFormData
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 pt-5 pb-5">{createServicePricingForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PriceForms);
//https://upmostly.com/tutorials/upload-a-file-from-a-react-component
//https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
//https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html
//https://stackoverflow.com/questions/51346619/how-to-send-form-data-with-react
