import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Brands from "../../../../components/serviceCrud/brands";
import MarketingTools from "../../../../components/serviceCrud/marketingTools";
//import ServicePricesForm from "../../../../components/serviceCrud/price";
import Admin from "../../../../components/admin";

//bring components

const ServiceComponents = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Marketing Tools And Brands </h2>
            </div>

            <div className="col-md-6">
              <MarketingTools />
            </div>

            <div className="col-md-6">
              <Brands />
              <hr />
              {/* <div className="col-md-6 pt-9 mt-5">
                <h2>Manage Service And Pricings </h2>
                <ServicePricesForm />
              </div> */}
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ServiceComponents;
