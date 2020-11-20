import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/setAuthToken";
//get the service price
import { withRouter } from "next/router";
import { API } from "../../config";

import {
  updatePackage,
  singlePackage,
  getComboPackages,
} from "../../actions/comboPackage";
const UpdatePackages = ({ router }) => {
  const [values, setValues] = useState({
    comboPackageName: "",
    desc: "",
    packagePrice: "",
    title: "",
    bundleDescription: "",
    error: false,
    success: false,
  });

  const {
    comboPackageName,
    desc,
    title,
    bundleDescription,
    error,
    success,
  } = values;

  useEffect(() => {
    // const checkedData = new FormData();
    initPackage();
  }, [router]);

  const token = getCookie("token");
  console.log(router.query.slug);
  const initPackage = () => {
    if (router.query.slug) {
      singlePackage(router.query.slug).then((data) => {
        // console.log(data[0]);
        // console.log(data[0].checkedPrice);
        if (data[0].error) {
          console.log(error);
        } else {
          setValues({
            ...values,
            comboPackageName: data[0].comboPackageName,
            desc: data[0].desc,
            title: data[0].title,
            bundleDescription: data[0].bundleDescription,
          });

          //   setdiscountPriceArray(data[0].checkedPrice);
        }
      });
    }
  };

  //   const setdiscountPriceArray = (packagePrices) => {
  //     console.log(packagePrices);
  //     let packageArray = [];
  //     packagePrices.map((price, i) => {
  //       //console.log(price);
  //       packageArray.push(price._id);
  //     });

  //     setCheckedPrice(packageArray);
  //   };

  //   const initPackagePrices = () => {
  //     getComboPackages().then((data) => {
  //       console.log("The price tag is", data);
  //       if (data.error) {
  //         setValues({ ...values, error: data.error });
  //       } else {
  //         setPackages(data);
  //       }
  //     });
  //   };

  //   const handlePriceToggle = (pId) => {
  //     //clear the state incase of any error
  //     setValues({ ...values, error: "" });
  //     const clickedPrice = checkedPrice.indexOf(pId);

  //     //storing all the checked Values in a variable
  //     const choosenPrices = [...checkedPrice];

  //     if (clickedPrice === -1) {
  //       choosenPrices.push(pId);
  //     } else {
  //       choosenPrices.splice(checkedPrice, 1);
  //     }
  //     console.log("Storing all the check Items in a variable", choosenPrices);
  //     setCheckedPrice(choosenPrices); // storing all checked value in the state
  //     //setDiscountedPrice(checkedPrice);
  //     //formData.set("discountedPrice", choosenPrices);
  //   };

  //   const findOutPackagePrices = (priceId) => {
  //     const result = checkedPrice.indexOf(priceId);
  //     if (result !== -1) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //   const showDiscountedPrice = (packages) => {
  //     // console.log(packages);
  //     return packages.map((price, i) => (
  //       <li key={i} className="list-unstyled">
  //         <input
  //           onChange={() => handlePriceToggle(price._id)}
  //           checked={findOutPackagePrices(price.checkedPrice[0]._id)}
  //           type="checkbox"
  //           className="mr-2"
  //         />
  //         <label className="form-check-label">{price.comboPackageName}</label>
  //       </li>
  //     ));
  //   };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const editPackage = (e) => {
    e.preventDefault();
    console.log("The Form Is Submitted");

    const newComboPackage = {
      comboPackageName,
      title,
      desc,
      bundleDescription,
      //   checkedPrice,
    };

    updatePackage(newComboPackage, router.query.slug, token).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          serviceName: "",
          duration: "",
          process: "",
          summary: "",
          error: "",
          success: `A new package  is created `,
        });

        Router.replace(`/admin`);
      }
    });
  };

  const updatePackageForm = () => {
    return (
      <form onSubmit={(e) => editPackage(e)}>
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
          Update
        </button>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="row">
          <div className="col-md-8 pb-5">
            {/* <div>
              <h5>Select Service and Discounted Price</h5>
              <ul
                style={{
                  maxHeight: "400px",
                  overflowY: "scroll",
                }}
              >
                {showDiscountedPrice(packages)}
              </ul>

              <hr />
            </div> */}

            {updatePackageForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UpdatePackages);
