import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewReview } from "../../actions/tools";

const Reviews = () => {
  const [values, setValues] = useState({
    reviewName: "",
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });

  const { reviewName, success, error, loading, reload } = values;
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

    setValues({ ...values, loading: true, error: false });

    //sending the value stored in state as input value from form
    createNewReview({ reviewName }, token).then((data) => {
      console.log(data);
      // if (data.error) {
      //   //setvalues fill the error variable and turn off the success

      //   setValues({ ...values, error: data.error, success: false });
      // } else {
      //   //turn all off and make the success true

      //   setValues({
      //     ...values,
      //     error: false,
      //     success: true,
      //     name: "",
      //     removed: false,
      //     reload: true,
      //   });
      // }
    });
  };
  const newReviewForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Review Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert Review"
            onChange={onChange("reviewName")}
            value={reviewName}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  };
  return <React.Fragment>{newReviewForm()}</React.Fragment>;
};

export default Reviews;
