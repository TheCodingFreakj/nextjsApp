import React, { useEffect } from "react";
import Router from "next/router";

//bring components
import { isAuth } from "../actions/setAuthToken";

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/authSignin");
    } else if (isAuth().role === 1) {
      Router.push("/");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Private;
