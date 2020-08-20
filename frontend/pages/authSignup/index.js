import React from "react";
// import Link from "next/link";
import Layout from "../../components/Layout";
import SignupComp from "../../components/SignupComponent";
import SignupPrivate from "../../components/signupPrivateComp";

//bring components

const Signup = () => {
  return (
    <Layout>
      <SignupPrivate>
        <h1 className="text-center pt-4 pb-4">
          Please Sign Up Before login in
        </h1>
        <div className="row">
          <div className="col-md-6 offset-md-2">
            <SignupComp />
          </div>
        </div>
      </SignupPrivate>
    </Layout>
  );
};

export default Signup;
