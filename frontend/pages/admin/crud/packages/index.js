import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import ComboPackages from "../../../../components/serviceCrud/combopackages";
import AddPackagePrice from "../../../../components/serviceCrud/addComboPackagePrice";
import Admin from "../../../../components/admin";

//bring components

const ComboPackageComponent = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2> Manage Combo Packages </h2>
            </div>

            <div className="col-md-6">
              <ComboPackages />
            </div>

            <div className="col-md-6">
              <AddPackagePrice />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ComboPackageComponent;
