import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import PortfolioForms from "../../../components/portfolio/portfolio";

//bring components

const PortfolioDashboard = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Portfolio</h2>
            </div>

            <div className="col-md-12">
              <PortfolioForms />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default PortfolioDashboard;
