import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
//import CustomerPrivate from "../../components/customer/customerPrivate";

//bring components

const CustomerIndex = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Your Collections </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerIndex;
