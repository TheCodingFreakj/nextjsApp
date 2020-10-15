import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import UpdatePriceForms from "../../../components/price/updatePrice";

//bring components

const PricingDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update the Price Object </h2>
            </div>

            <div className="col-md-12">
              <UpdatePriceForms />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default PricingDashboard;
