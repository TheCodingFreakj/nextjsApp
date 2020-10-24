import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { Reviews, getCurrentLoggedUser } from "../../actions/reviews";
import { isAuth } from "../../actions/setAuthToken";
//bring components

const ReviewForm = ({ serviceId }) => {
  //console.log("This is serviceid", serviceId);
  //console.log("This is details of authorized user", isAuth()); // works only for logged in user // dont load the slug
  const [reviews, setReviews] = useState({
    review: "",
    rating: "",
    error: false,
    success: false,
  });

  const [user, setUser] = useState();

  const { review, rating, error, success } = reviews;

  useEffect(() => {
    //get cuurent user
    loadLoggedInuser();
  }, []); //anytime the router change this useeffect will run

  const token = getCookie("token");
  const loadLoggedInuser = () => {
    if (isAuth()) {
      getCurrentLoggedUser(isAuth().username).then((data) => {
        //console.log("The current logged in user info", data);
        if (data.error) {
          setReviews({ ...reviews, error: data.error });
        } else {
          setUser(data);
        }
      });
    }
  };
  const onChange = (name) => (e) => {
    const value = e.target.value;
    // console.log(value);
    setReviews({
      ...reviews,
      [name]: value, //keping the target values in state
      error: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("This is onSubmit");
    const formData = {
      review,
      rating,
      user,
      serviceId,
    };
    Reviews(formData, token).then((data) => {
      //console.log("This is getting from backend", data);
      if (data.error) {
        setReviews({
          ...reviews,
          success: false,
          error: data.error,
        });
      } else {
        setReviews({
          ...reviews,
          review: "",
          rating: "",
          error: "",
          success: `A new review is created `,
        });
      }
    });
  };
  const createRatings = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Give the review here"
            name="review"
            value={review}
            onChange={onChange("review")}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Give the ratings here"
            name="rating"
            value={rating} // This value should be coming from the state
            onChange={onChange("rating")} //setFormData
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
          <div className="col-md-6 bg-warning pt-5 pb-5">{createRatings()}</div>
          {/* {JSON.stringify(user)} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ReviewForm);
