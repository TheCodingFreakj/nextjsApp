import React from "react";
import Link from "next/link";
import Layout from "../../../../../components/Layout";
import Admin from "../../../../../components/admin";
import ReadPackagePrices from "../../../../../components/serviceCrud/readComboPackageprice";
import ReadPackages from "../../../../../components/serviceCrud/readComboPackages";

//bring components

const PackagePricingDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage ComboPackagePrice-Update and Delete </h2>
            </div>

            <div className="col-md-6">
              This is for updating and deleting service prices
              <ReadPackages />
            </div>

            <div className="col-md-6">
              This is for updating and deleting service prices
              <ReadPackagePrices />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default PackagePricingDashboard;
