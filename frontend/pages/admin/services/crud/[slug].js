import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import UpdateServices from "../../../../components/services/updateServices";

//bring components

const Services = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update the Services </h2>
            </div>

            <div className="col-md-12">
              <UpdateServices />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default Services;
