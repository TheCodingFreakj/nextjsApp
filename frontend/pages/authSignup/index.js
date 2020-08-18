import React from "react";
// import Link from "next/link";
import Layout from "../../components/Layout";
import SignupComp from "../../components/SignupComponent";

//bring components

const Signup = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Please Sign Up Before login in</h1>
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <SignupComp />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
