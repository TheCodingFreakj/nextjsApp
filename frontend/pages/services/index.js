import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Card, Icon, Button, Message } from "semantic-ui-react";
import { getComboPackages } from "../../actions/comboPackage";
import { getAllServices } from "../../actions/services";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import ShowServices from "../../components/services/showservices";
import ShowComboPackages from "../../components/serviceCrud/showCombopackages";
//changes required

//make services server rendered and combopackages at use effect
const ServicesPage = () => {
  //console.log("The Page Props Are", data);
  const [packages, setPackages] = useState([]);
  const [loader, setLoader] = useState({
    limit: 3,
    skip: 0,
  });

  const { limit, skip } = loader;

  //Loading the compopackages on useEffect
  useEffect(() => {
    loadCombopackages();
  }, []);

  //storing the compopackages in state
  const loadCombopackages = async () => {
    await getComboPackages().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPackages(data);
      }
    });
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          {/* header mark up for outbound link to aboutus page */}
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
          {/* sending the compopackage data to its component */}
          <ShowComboPackages packages={packages} />

          {/* sending the skip and limit value to the showservices component for second half */}
          <ShowServices limit={limit} skip={skip} />
        </div>
      </main>
    </Layout>
  );
};

export default withRouter(ServicesPage);

//For stylinging:- Put one quiz pop up here on load quiz

//https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
