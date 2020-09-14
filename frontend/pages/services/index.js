import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import ServiceCards from "../../components/services/servicecards";

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

            <div className="col-md-12 pl-7 pt-3">
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                ComboPackages
              </h1>
              <div className="col-md-12 ml-8 pt-9 ">
                <ServiceCards />
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
