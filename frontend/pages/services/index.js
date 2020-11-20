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

//changes required

//make services server rendered and combopackages at use effect
const ServicesPage = ({ data }) => {
  //console.log("The Page Props Are", data);
  const [services, setServices] = useState([]);
  //const loggedInUser = isAuth();

  const showAllServicePackages = () => {
    return data.map((comboPackage, i) => (
      <div key={i} className="col-md-3 d-flex align-items-start">
        <div>
          <Card comboPackage={comboPackage} />
          <div className="col-md-4">
            <Link key={i} href={`/comboPackage/${comboPackage.slug}`}>
              <a>
                <button
                  className="mt-4 btn-lg btn-block btn btn-success"
                  style={{ width: "235px" }}
                  role="link"
                >
                  Subscribe Now
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    loadIndvServices();
  }, []);

  const loadIndvServices = () => {
    // let skip = 0;
    // let limit = 2;
    getAllServices().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setServices(data);
      }
    });
  };

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
                How Do We Prefer To Work
              </h1>
              <div className="col-md-12 pt-3">
                <p>
                  Website development aint about creating a non-living software.
                  It is about creating a stoppage for customers,users as per
                  what they value. At Marketing Solutions App, we adopt the
                  agile methodology for website development.
                </p>

                <Link href="/about-us">
                  <a className=" btn btn-small btn-success ">
                    Learn More About We Can Help You
                  </a>
                </Link>
              </div>
            </div>
          </header>

          <div className="container-fluid">
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                ComboPackages
              </h1>
            </div>
            <div className="row justify-content-md-center">
              {showAllServicePackages()}
            </div>
          </div>

          <div className="col-md-12 pt-3">
            <h1 className="display-4 font-weight-bold text-center">
              Individual Services
            </h1>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-md-center">
            {showIndvServices()}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const data = await getComboPackages();
  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { data },
    };
  }
};

export default withRouter(ServicesPage);

//For stylinging:- Put one quiz pop up here on load quiz

//https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
