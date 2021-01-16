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

    // "_id": "5f3b9680e25dd70a085b7905",
    // "role": 1,
    // "name": "Pallavi Priyadarshini",
    // "email": "pallavidapriya75@gmail.com",
    // "profile": "http://localhost:3001/profile/e2a199",
    // "username": "pallavi priyadarshini",
    // "hashed_password": "$2a$10$e5e.HzEUjcv/Hx5rWWJazOUZAMlHSiYD6fZ5c5iNO.LK4G1oILE0O",
    // "__v": 0,
    // "about": "I am senior dev and founder of this company"

    signin(user).then((data) => {
      console.log(data);
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
// it('login check with right data',()=>{
//   wrapper = shallow(<Login/>);
//   wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
//   wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant123'}});
//   wrapper.find('button').simulate('click');
//   expect(wrapper.state('isLogined')).toBe(true);
//   })
//   it('login check with wrong data',()=>{
//   wrapper = shallow(<Login/>);
//   wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
//   wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
//   wrapper.find('button').simulate('click');
//   expect(wrapper.state('isLogined')).toBe(false);
//   })
// Child component is rendered with the right props.
// Everything is rendered correctly on initial mount.
// Changes to state or props results in the correct changes in what’s rendered, as applicable.
// State changes as expected when there’s an event or a method call.
// Functions external to the component (e.g, from props) are called with the right arguments when there’s an event (e.g., mouse click) or a method call.
