import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getComboPackages } from "../../actions/comboPackage";
import { getAllServices } from "../../actions/services";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import Card from "../../components/services/ServiceCards/serviceCards";
import SmallCard from "../../components/services/indvservices";

const ServicesPage = ({ data }) => {
  //console.log("The Page Props Are", data);
  const [services, setServices] = useState([]);
  const showAllServicePackages = () => {
    return data.map((comboPackage, i) => (
      <div key={i} className="col-md-3 d-flex align-items-center">
        <div className="text-justify p-2 bd-highlight">
          <Card comboPackage={comboPackage} />
          <button
            className="mt-4 ml-auto btn btn-success"
            style={{ width: "200px" }}
          >
            Book Now
          </button>
        </div>
      </div>
    ));
  };

  const loadIndvServices = () => {
    getAllServices().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setServices(data);
      }
    });
  };

  useEffect(() => {
    loadIndvServices();
  }, []);

  const showIndvServices = () => {
    return services.map((service, i) => (
      <div key={i} className="col-md-4">
        <article>
          <SmallCard service={service} />
        </article>
      </div>
    ));
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                ComboPackages
              </h1>
              <div className="bg-primary text-white d-flex justify-content-around">
                {showAllServicePackages()}
              </div>
            </div>

            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Individual Services
              </h1>
              <div className=" d-flex justify-content-around">
                {/* {JSON.stringify(services)} */}
                {showIndvServices()}
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

  //console.log(data);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { data },
    };
  }
};

// export const getStaticProps = async (context) => {
//   const serviceData = await getAllServices();
//   console.log(serviceData);
//   return {
//     props: { serviceData }, // will be passed to the page component as props
//   };
// };
export default withRouter(ServicesPage);
