import React, { useState, useEffect } from "react";
import Router from "next/router";

//bring components
import { signin } from "../actions/auth";
import { authenticate } from "../actions/setAuthToken";
import { isAuth } from "../actions/setAuthToken";

const SigninComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    message: "",
    error: "",
    loading: false,
    showForm: true,
  });

  const { email, password, message, error, loading, showForm } = formData;

  useEffect(() => {
    //decide when you want to run this
    //it runs depends on change in state
    isAuth() && Router.push("/");
  }, []);

  //handing submit

  const onSubmit = async (e) => {
    e.preventDefault();

    setFormData({ ...formData, loading: true, error: false });

    const user = {
      email,
      password,
    };

    signin(user).then((data) => {
      if (data.errors) {
        // console.log(data.error);
        setFormData({
          ...formData,
          loading: false,
          error: [data.errors[0].msg],
        });
      } else {
        //save the user token either in cookie or local storage in front end
        //save the user info in local storage

        //authenticate the user

        authenticate(data, () => {
          if (isAuth().role === 1) {
            Router.push("/admin");
          } else if (isAuth().role === 0) {
            Router.push("/user");
          } else if (isAuth().customerRole === "consumer") {
            Router.push("/customerSignin");
          }
        });
      }
    });
  };

  //handle change
  const onChange = (name) => (e) => {
    setFormData({
      ...formData,
      error: false,
      [name]: e.target.value,
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading ...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            value={email} // grab the init value from formData
            onChange={onChange("email")} //setFormData
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Your Password"
            value={password} // grab the init value from formData
            onChange={onChange("password")}
            required
          />
        </div>

        <div>
          <input type="submit" className="btn btn-primary " value="Signin" />
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}

      {/* show sign up form only if showForm is true//by default its true 
  once user sign in it wont show the signup form */}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SigninComp;
