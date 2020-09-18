import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import PriceForms from "../../../components/price/price";

//bring components

const PricingDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Pricings Of the Service and Packages</h2>
            </div>

            <div className="col-md-12">
              <PriceForms />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default PricingDashboard;
