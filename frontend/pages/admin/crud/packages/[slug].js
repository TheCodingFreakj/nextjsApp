import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Admin from "../../../../components/admin";
import UpdatePackagePriceForms from "../../../../components/serviceCrud/updatePackagePrice";
import UpdatePackages from "../../../../components/serviceCrud/updateCombopackages";
//bring components

const PackagePricingDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update the Combo Package Price Object </h2>
            </div>

            <div className="col-md-6">
              <UpdatePackages />
            </div>

            <div className="col-md-6">
              <UpdatePackagePriceForms />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default PackagePricingDashboard;
