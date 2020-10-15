import React from "react";
import Link from "next/link";
import Layout from "../../../../../components/Layout";
import Admin from "../../../../../components/admin";
import ReadPrices from "../../../../../components/price/readPrices";

//bring components

const PricingDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage ServicesPrices-Update and Delete </h2>
            </div>

            <div className="col-md-12">
              This is for updating and deleting service prices
              <ReadPrices />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default PricingDashboard;
