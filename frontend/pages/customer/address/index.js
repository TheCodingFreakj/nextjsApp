import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import BusinessDetailsForms from "../../../components/customer/businessDetails";

//bring components

const BusinessAddress = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Portfolio</h2>
            </div>

            <div className="col-md-12">
              <BusinessDetailsForms />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default BusinessAddress;
