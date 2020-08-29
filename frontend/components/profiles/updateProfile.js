import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/setAuthToken";
import { getProfile, updateProfile } from "../../actions/user";

const ProfileUpdate = () => {
  //request the backend to get the authenticated logged in user profile
  //get all his details
  //populated that in the form here
  //make the update
  //send the details to the backend to update their

  const [values, setValues] = useState({
    username: "",
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
  } = values;
  //request the backend to get the authenticated logged in user profile

  const init = () => {
    getProfile(token).then((data) => {
      //console.log(data); //data coming
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
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onChange = (name) => (e) => {
    //console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
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

  const onSubmit = (e) => {
    e.preventDefault();

    updateProfile(token, userData).then((data) => {
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
        //either redirect or upa\date the state here
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false,
        });
      }
    });
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
            value={username} // grab the init value from the state
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
            value={name} // grab the init value from the state
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
            value={email} // grab the init value from the state
            onChange={onChange("email")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={password} // grab the init value from the state
            onChange={onChange("password")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">About</label>
          <input
            type="text-area"
            className="form-control"
            name="about"
            value={about} // grab the init value from the state
            onChange={onChange("about")}
            required
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
          <div className="col-md-4">Image</div>

          <div className="col-md-8">
            {/* {JSON.stringify({ username, email, name })} */}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;