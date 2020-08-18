import React from "react";
// import Link from "next/link";
import SigninComp from "../../components/SigninComponent";
import Layout from "../../components/Layout";

//bring components

const Signin = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">You can Log In Now</h1>
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <SigninComp />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
