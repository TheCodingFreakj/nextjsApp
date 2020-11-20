import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  getCookie,
  isAuth,
  updateUserLocalStorage,
} from "../../actions/setAuthToken";
import { getProfile, updateProfile } from "../../actions/user";
import { API } from "../../config";

const ProfileUpdate = () => {
  //request the backend to get the authenticated logged in user profile
  //get all his details
  //populated that in the form here
  //make the update
  //send the details to the backend to update their

  const [values, setValues] = useState({
    username: "",
    userId: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: "", // This is the form Data
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    password,
    about,
    error,
    success,
    loading,
    photo,
    userData,
    userId,
  } = values;
  //request the backend to get the authenticated logged in user profile

  const init = async () => {
    await getProfile(token).then((data) => {
      if (data.err) {
        //push the error in the state
        setValues({ ...values, error: data.error });
      } else {
        //use this values from the state to populate in the form
        //got the data into the state
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          userId: data._id,
        });
      }
    });
  };

  //getting authenticated logged in user every refresh
  useEffect(() => {
    init();
  }, []);

  const onChange = (name) => (e) => {
    //console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();

    console.log("This is the value I am updating now", value);
    userFormData.set(name, value); //This is the data we will send to bacvkend
    //after populating we have to update the state
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "This is the entire userdata I am to send to the backend",
      userData
    );

    await updateProfile(token, userData).then((data) => {
      //console.log(data);
      if (data.err) {
        //push the error in the state
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        // updateUserLocalStorage(data, () => {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false,
          userId: data._id,
        });
        // });
        //either redirect or upa\date the state here
      }
    });
  };

  const showError = () => {
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>;
  };
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile Updated
    </div>
  );

  const showLoading = () => {
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>;
  };

  const profileUpdateForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="btn btn-outline-success">
            Profile Photo
            <input
              onChange={onChange("photo")}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username || ""} // grab the init value from the state
            onChange={onChange("username")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name || ""} // grab the init value from the state
            onChange={onChange("name")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email || ""} // grab the init value from the state
            onChange={onChange("email")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password || ""} // grab the init value from the state
            onChange={onChange("password")}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">About</label>
          <input
            type="text"
            className="form-control"
            name="about"
            value={about || ""}
            onChange={onChange("about")}
          />
        </div>

        <div>
          <input type="submit" className="btn btn-primary " value="Update" />
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${API}/api/user/photo/${userId}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{ maxHeight: "auto", maxWidth: "100%" }}
              alt="user profile"
            />
          </div>

          <div className="col-md-8 mb-5">
            {profileUpdateForm()}
            {showSuccess()}
            {showError()}
            {showLoading()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
