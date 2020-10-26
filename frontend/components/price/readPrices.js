import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/setAuthToken";
//get the service price
import { getAllServicePriceOptions, removePrice } from "../../actions/price";
import moment from "moment";

const ReadPrices = ({ slug }) => {
  const [price, setPrice] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = () => {
    getAllServicePriceOptions().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setPrice(data);
      }
    });
  };
  const deletePrice = (slug) => {
    removePrice(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccessDeleteMessage(data.message);
        loadPrices(); //once we delete we need to load blog with page refresh
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure to delete the price object? ");
    if (answer) {
      deletePrice(slug);
    }
  };

  const showUpdateButton = (price) => {
    return (
      <Link href={`/admin/price/${price.slug}`}>
        <a className=" btn btn-small btn-success">Price Update</a>
      </Link>
    );
  };

  const showDiscountPriceUpdate = (price) => {
    return (
      <Link href={`/admin/price/${price.slug}`}>
        <a className=" btn btn-small btn-success"> Discount Price Update</a>
      </Link>
    );
  };

  const showAllPrices = () => {
    return price.map((pri, i) => {
      //console.log(pri);
      return (
        <div key={i} className="pb-5">
          <h3>{pri.serviceName}</h3>
          <p>
            <em>price: {pri.discountedServiceCharges}</em>
          </p>

          <button
            className="btn btn-small btn-danger"
            onClick={() => deleteConfirm(pri.slug)}
          >
            Delete
          </button>

          {showUpdateButton(pri)}

          {showDiscountPriceUpdate(pri)}
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
          {showAllPrices()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadPrices;
