import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

//bring components

const Tools = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Our Collection Of Tools </h2>
            <h3>SEO Tools</h3>

            <h3>ContentMarketing Tools</h3>

            <h3>Email Marketing Tools</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
