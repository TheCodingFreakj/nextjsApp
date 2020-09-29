import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getComboPackages } from "../../actions/comboPackage";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import Card from "../../components/services/ServiceCards/serviceCards";

const ServicesPage = ({ data }) => {
  console.log("The Page Props Are", data);

  const showAllServicePackages = () => {
    return data.map((comboPackage, i) => (
      <div key={i} className="d-flex justify-content-around">
        <div className="p-2 bd-highlight">
          <Card comboPackage={comboPackage} />
          <button className="btn btn-success">Book Now</button>
        </div>
      </div>
    ));
  };

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
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                ComboPackages
              </h1>
              <div className="d-flex justify-content-around">
                {showAllServicePackages()}
              </div>
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  //data required here//getComboPackages

  const data = await getComboPackages();
  console.log(data);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { data },
    };
  }
};
export default withRouter(ServicesPage);
