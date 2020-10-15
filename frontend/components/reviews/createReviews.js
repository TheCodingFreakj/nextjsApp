import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewReview } from "../../actions/reviews";
import { getAllServices } from "../../actions/services";
import { getAllUsers } from "../../actions/user";

const Reviews = ({ router }) => {
  const [values, setValues] = useState({
    review: "",
    rating: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });

  const { review, rating, success, error, loading, reload } = values;
  const [services, setServices] = useState([]);
  const [checkedService, setCheckedService] = useState([]);
  const [client, setClient] = useState([]);
  const [reviewedBy, setreviewedBy] = useState([]);

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values });

    loadServices();
    loadBrands();
  }, [router]);

  const loadBrands = () => {
    getAllUsers().then((data) => {
      // console.log("This are all the tools I m getting from the backend", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setClient(data);
      }
    });
  };

  const loadServices = () => {
    getAllServices().then((data) => {
      // console.log("This are all the tools I m getting from the backend", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setServices(data);
      }
    });
  };

  const showServicesTaken = () => {
    return services.map((service, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handleToggle(service._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">
          <h5>{service.title}</h5>
        </label>
      </li>
    ));
  };

  const handleToggle = (sId) => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    const clickedService = checkedService.indexOf(sId);

    //storing all the checked Values in a variable
    const choosenServices = [...checkedService];

    if (clickedService === -1) {
      choosenServices.push(sId);
    } else {
      choosenServices.splice(checkedService, 1);
    }
    console.log("Storing all the check Items in a variable", choosenServices);
    setCheckedService(choosenServices); // storing all checked value in the state
  };
  const showCustomers = () => {
    return client.map((cust, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handleCustomerToggle(cust._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">
          <div>{cust.customerRole ? <p>{cust.name}</p> : " "}</div>
        </label>
      </li>
    ));
  };
  const handleCustomerToggle = (cId) => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    const clickedCustomer = reviewedBy.indexOf(cId);

    //storing all the checked Values in a variable
    const choosenCustomers = [...reviewedBy];

    if (clickedCustomer === -1) {
      choosenCustomers.push(cId);
    } else {
      choosenCustomers.splice(reviewedBy, 1);
    }
    console.log("Storing all the check Items in a variable", choosenCustomers);
    setreviewedBy(choosenCustomers); // storing all checked value in the state
  };
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
    //console.log("The Form Is Submitted");

    setValues({ ...values, loading: true, error: false });

    const dataForBackened = {
      review,
      rating,
      checkedService,
      reviewedBy,
    };

    //sending the value stored in state as input value from form
    createNewReview(dataForBackened, token).then((data) => {
      //console.log(data);
      if (data.error) {
        //setvalues fill the error variable and turn off the success

        setValues({ ...values, error: data.error, success: false });
      } else {
        //turn all off and make the success true

        setValues({
          ...values,
          error: false,
          success: `A new service :"${data.slug}" is created`,
          review: "",
          rating: "",
          removed: false,
          reload: true,
        });
      }
    });
  };
  const newReviewForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Review Name </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Insert Review"
            onChange={onChange("review")}
            value={review}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Review Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ratings"
            onChange={onChange("rating")}
            value={rating}
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
        <div>
          <h5>Select Service and Discounted Price</h5>
          <ul
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {showServicesTaken()}
          </ul>

          <hr />
        </div>

        <div>
          <h5>Select Customers</h5>
          <ul
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {showCustomers()}
          </ul>

          <hr />
        </div>
        {newReviewForm()}
      </div>
    </React.Fragment>
  );
};

export default withRouter(Reviews);
