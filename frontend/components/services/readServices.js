import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/setAuthToken";
//get the service price
import { getAllServices, removeService } from "../../actions/services";
import moment from "moment";

const ReadServices = ({ slug }) => {
  const [services, setServices] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    getAllServices().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setServices(data);
      }
    });
  };
  const deleteService = (slug) => {
    removeService(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccessDeleteMessage(data.message);
        loadServices(); //once we delete we need to load blog with page refresh
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure to delete the blog? ");
    if (answer) {
      deleteService(slug);
    }
  };

  const showUpdateButton = (service) => {
    return (
      <Link href={`/admin/services/${service.slug}`}>
        <a className=" btn btn-small btn-success">Admin Update</a>
      </Link>
    );
  };

  const showAllServices = () => {
    return services.map((service, i) => {
      const getCurrentPrice = () => {
        return service.discountedServiceCharges.map((price, i) => (
          <div className="text-start" key={i}>
            Price: {price.discountedServiceCharges}
          </div>
        ));
      };
      // console.log(service);
      return (
        <div key={i} className="pb-5">
          <h3>{service.title}</h3>
          <p className="mark">
            Duration {service.duration} | Written on
            {moment(service.updatedAt).from()}
            {getCurrentPrice()}
            <button
              className="btn btn-small btn-danger"
              onClick={() => deleteConfirm(service.slug)}
            >
              Delete
            </button>
          </p>

          {showUpdateButton(service)}
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
          {showAllServices()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadServices;
