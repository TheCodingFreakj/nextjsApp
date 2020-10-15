import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { getComboPackages, removePackage } from "../../actions/comboPackage";

const ReadPackagePriceForms = () => {
  const [packages, setPackages] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    getComboPackages().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setPackages(data);
      }
    });
  };
  const deletePackage = (slug) => {
    removePackage(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccessDeleteMessage(data.message);
        loadPackages(); //once we delete we need to load blog with page refresh
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure to delete the blog? ");
    if (answer) {
      deletePackage(slug);
    }
  };

  const showUpdateButton = (pack) => {
    return (
      <Link href={`/admin/crud/packages/${pack.slug}`}>
        <a className=" btn btn-small btn-success">Admin Update</a>
      </Link>
    );
  };

  const showAllPackages = () => {
    return packages.map((pack, i) => {
      const getCurrentPrice = (checkedPrice) => {
        //console.log(checkedPrice);
        return checkedPrice[0].discountedPackageCharges;
      };
      // console.log(service);
      return (
        <div key={i} className="pb-5">
          <h3>{pack.title}</h3>
          <p className="mark">
            {getCurrentPrice(pack.checkedPrice)}
            <button
              className="btn btn-small btn-danger"
              onClick={() => deleteConfirm(pack.slug)}
            >
              Delete
            </button>
          </p>

          {showUpdateButton(pack)}
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {successDeleteMessage && (
            <div className="alert alert-warning">{successDeleteMessage}</div>
          )}
          {showAllPackages()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadPackagePriceForms;
