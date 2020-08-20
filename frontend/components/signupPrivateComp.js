import React, { useEffect } from "react";
import Router from "next/router";

//bring components
import { isAuth } from "../actions/setAuthToken";

const SignupPrivate = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/authSignin");
    } else if (isAuth().role !== 0) {
      Router.push("/authSignup");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SignupPrivate;
