import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import CreateServices from "../../../components/services/createServices";

//bring components

const Services = () => {
  return (
    <React.Fragment>
      <Layout>
        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-5 pb-5">
                <h2>Create New Service Card </h2>
              </div>

              <div className="col-md-12">
                <CreateServices />
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </React.Fragment>
  );
};

export default Services;
