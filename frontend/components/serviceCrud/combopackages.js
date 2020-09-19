import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewComboPackage } from "../../actions/comboPackage";

const ComboPackages = () => {
  const [values, setValues] = useState({
    comboPackageName: "",
    desc: "",
    packagePrice: "",
    title: "",
    bundleDescription: "",
    error: false,
    success: false,
    loading: false,
    reload: false,
  });

  const {
    comboPackageName,
    desc,
    title,
    bundleDescription,
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

    const newComboPackage = {
      comboPackageName,
      title,
      desc,
      bundleDescription,
    };

    createNewComboPackage(newComboPackage, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          packageName: "",
          desc: "",
          bundleDescription: "",
          error: false,
          success: true,
          loading: false,
          reload: true,
        });
      }
    });
  };
  const comboPackagesForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Combo Package Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The Package Name"
            onChange={onChange("comboPackageName")}
            value={comboPackageName}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Combo Package Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Package Title"
            onChange={onChange("title")}
            value={title}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the Description </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The Description"
            onChange={onChange("desc")}
            value={desc}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">
            What all is included in the service
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="bundleDescription"
            onChange={onChange("bundleDescription")}
            value={bundleDescription}
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
