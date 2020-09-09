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

            <section>
              <div className="pb-5 text-center">
                {/* {showAllServices()} */}
                Show all services
                <br />
              </div>
            </section>

            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                ComboPackages
              </h1>

              <div className="pb-5 text-center">
                <p className="pb-5 text-center">Choose your duration</p>
                <div className="mr-5 text-center">
                  <span className="mr-5 pt-5 pb-4 pl-3 pr-3 text-center">
                    <button className="btn btn-success">Monthly</button>
                  </span>
                  <span className="mr-5 text-center">
                    <button className="btn btn-success">12 Months -18 %</button>
                  </span>
                  <span className="mr-5 text-center">
                    <button className="btn btn-success">24 Months -30 %</button>
                  </span>
                </div>
              </div>
            </div>

            <section>
              <div className="pb-5 text-center">
                {/* {showAllServices()} */}
                Show all services
                <br />
              </div>
            </section>
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
