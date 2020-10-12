import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
//import CustomerPrivate from "../../components/customer/customerPrivate";
import CustomerProfileUpdate from "../../components/profiles/customerProfile";

//bring components

const CustomerIndex = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Your Account </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 pt-5 pb-5">
            <h3>Your Orders </h3>
          </div>

          <div className="col-md-4 pt-5 pb-5">
            <h3>Login And Security </h3>

            <CustomerProfileUpdate />

            <Link href="/customer/address">
              <a>Add Business Details</a>
            </Link>
          </div>

          <div className="col-md-4 pt-5 pb-5">
            <h3>Payment Options </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerIndex;
