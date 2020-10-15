import React from "react";
import Link from "next/link";
import Layout from "../../../../../components/Layout";
import Admin from "../../../../../components/admin";
import ReadTools from "../../../../../components/serviceCrud/readTools";

//bring components

const ToolsDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Tools-Update and Delete </h2>
            </div>

            <div className="col-md-12">
              This is for updating and deleting Tool prices
              <ReadTools />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ToolsDashboard;
