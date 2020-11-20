import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewComboPackage } from "../../actions/comboPackage";
import { getAllPackagePriceOptions } from "../../actions/comboPackage";

const ComboPackages = ({ router }) => {
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

  const [packagePrice, setPackagePrice] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);

  useEffect(() => {
    setValues({ ...values });

    showPriceBar();
  }, [router]);
  const showPriceBar = () => {
    getAllPackagePriceOptions().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setPackagePrice(data);
      }
    });
  };

  const handlePriceToggle = (pId) => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    const clickedPrice = checkedPrice.indexOf(pId);

    //storing all the checked Values in a variable
    const choosenPrices = [...checkedPrice];

    if (clickedPrice === -1) {
      choosenPrices.push(pId);
    } else {
      choosenPrices.splice(checkedPrice, 1);
    }
    console.log("Storing all the check Items in a variable", choosenPrices);
    setCheckedPrice(choosenPrices); // storing all checked value in the state
  };
  const showDiscountedPackagePrice = () => {
    return packagePrice.map((price, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handlePriceToggle(price._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">
          <h5>{price.packageName}</h5>
          {price.discountedPackageCharges}
        </label>
      </li>
    ));
  };
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
    const newComboPackage = {
      comboPackageName,
      title,
      desc,
      bundleDescription,
      checkedPrice,
    };

    console.log("This is the object from frontend", newComboPackage);

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
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="col-md-8 pb-5">
          <div>
            <h5>Select Service and Discounted Price</h5>
            <ul
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
              }}
            >
              {showDiscountedPackagePrice()}
            </ul>

            <hr />
          </div>
          {comboPackagesForm()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ComboPackages);
