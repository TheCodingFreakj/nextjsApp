import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import { API } from "../../config";

const ServicesPage = () => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Individual Services
              </h1>
            </div>

            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                ComboPackages
              </h1>
            </div>
          </header>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">Show all ServicesPage</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ServicesPage;
