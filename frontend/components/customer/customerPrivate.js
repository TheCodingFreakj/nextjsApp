import React, { useEffect } from "react";
import Router from "next/router";

//bring components
import { isAuth } from "../../actions/setAuthToken";

const CustomerPrivate = ({ children }) => {
  useEffect(() => {
    if (isAuth && isAuth().customerRole === "consumer") {
      Router.push("/services");
    } else if (isAuth().role === 1) {
      Router.push("/authSignin");
    } else if (isAuth().role === 0) {
      Router.push("/authSignin");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default CustomerPrivate;
