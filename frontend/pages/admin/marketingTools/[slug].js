import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";

import UpdateTools from "../../../components/serviceCrud/updateTools";

//bring components

const Services = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update the tools </h2>
            </div>

            <div className="col-md-12">
              <UpdateTools />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default Services;
