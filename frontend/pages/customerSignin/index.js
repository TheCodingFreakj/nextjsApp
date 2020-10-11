import React from "react";
// import Link from "next/link";
import CustomerSigninComp from "../../components/customer/customerSignin";
import Layout from "../../components/Layout";

//bring components

const Signin = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Log In</h1>
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <CustomerSigninComp />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
