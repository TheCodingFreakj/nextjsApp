import React, { useState, useEffect } from "react";
import Router from "next/router";
import { signup } from "../../actions/auth";
import Link from "next/link";
//bring components

import { isAuth } from "../../actions/setAuthToken";

const CustomerSignupComp = () => {
  // console.log(isAuth());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    customerRole: "consumer",
    message: "",
    error: "",
    loading: false,
    showForm: true,
  });

  const {
    name,
    email,
    password,
    customerRole,
    message,
    error,
    loading,
    showForm,
  } = formData;

  useEffect(() => {
    //decide when you want to run this
    //it runs depends on change in state
    isAuth() && Router.push("/");
  }, []);

  //handing submit

  const onSubmit = async (e) => {
    e.preventDefault();

    setFormData({ ...formData, loading: true, error: false });

    const newUser = {
      name,
      email,
      password,
      customerRole,
    };

    signup(newUser).then((data) => {
      if (data.errors) {
        setFormData({
          ...formData,
          loading: false,
          error: [data.errors[0].msg],
        });
      } else {
        // console.log(data.response);

        setFormData({
          ...formData,
          name: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
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
    message ? (
      <div className="alert alert-info">
        {message}

        <Link href={`/customerSignin `}>
          <a className="btn btn-small btn-success">Sign In </a>
        </Link>
      </div>
    ) : (
      ""
    );

  const signupForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            value={name} // grab the init value from formData
            onChange={onChange("name")} //setFormData
            required
          />
        </div>

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
          <input type="submit" className="btn btn-primary" value="Signup" />

          <Link href={`/customerSignin `}>
            <a className="btn btn-small btn-success">Sign In </a>
          </Link>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}

      {/* {JSON.stringify(error)} */}

      {/* show sign up form only if showForm is true//by default its true
  once user sign in it wont show the signup form */}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default CustomerSignupComp;
