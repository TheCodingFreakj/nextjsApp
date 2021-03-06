import React, { useEffect } from "react";
import Router from "next/router";

//bring components
import { isAuth } from "../actions/setAuthToken";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/authSignin");
    } else if (isAuth().role === 0) {
      Router.push("/");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;
