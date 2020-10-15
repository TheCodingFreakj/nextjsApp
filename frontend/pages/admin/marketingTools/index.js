import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import MarketingTools from "../../../components/serviceCrud/marketingTools";

//bring components

const ToolsDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Tools</h2>
            </div>

            <div className="col-md-12">
              <MarketingTools />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ToolsDashboard;
