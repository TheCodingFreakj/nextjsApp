import React from "react";
// import Link from "next/link";
import CustomerSignupComp from "../../components/customer/customerSignup";
import Layout from "../../components/Layout";

//bring components

const Signin = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">
        Sign Up To Purchase Your Package
      </h1>
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <CustomerSignupComp />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
