import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";

const ComboPackages = () => {
  const [values, setValues] = useState({
    packageName: "",
    desc: "",
    listSize: "",
    comboSize: "",
    servDesc: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });

  const {
    packageName,
    desc,
    listSize,
    comboSize,
    servDesc,
    error,
    success,
    loading,
    reload,
  } = values;
  const token = getCookie("token");
  const onChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("The Form Is Submitted");

    //   setValues({ ...values, loading: true, error: false });

    //   //sending the value stored in state as input value from form
    //   createNewBrand({ brandName }, token).then((data) => {
    //     console.log(data);
    //     // if (data.error) {
    //     //   //setvalues fill the error variable and turn off the success

    //     //   setValues({ ...values, error: data.error, success: false });
    //     // } else {
    //     //   //turn all off and make the success true

    //     //   setValues({
    //     //     ...values,
    //     //     error: false,
    //     //     success: true,
    //     //     name: "",
    //     //     removed: false,
    //     //     reload: true,
    //     //   });
    //     // }
    //   });
  };
  const comboPackagesForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Package Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The Package Name"
            onChange={onChange("packageName")}
            value={packageName}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the Description </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The Package Name"
            onChange={onChange("desc")}
            value={desc}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the List Size </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The List Size"
            onChange={onChange("listSize")}
            value={listSize}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the Combo Size </label>
          <input
            type="text"
            className="form-control"
            placeholder="Combo Size"
            onChange={onChange("comboSize")}
            value={comboSize}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the Service Size </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Service Size"
            onChange={onChange("servDesc")}
            value={servDesc}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  };
  return <React.Fragment>{comboPackagesForm()}</React.Fragment>;
};

export default ComboPackages;
//https://secure.getresponse.com/pricing/en?_ga=2.176755109.1251534595.1599641268-10827509.1599641268
