//This is individual Page to show services

//ratings
//reviews by brands
//Explanation of how we  can help
//related work or portfolio

//This page chnahes based on router and slug

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleService } from "../../actions/services";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
//import SmallCard from "../../components/blogs/smallcard";

const SingleService = ({ service, query }) => {
  console.log(query);
  console.log(service);
  //   const [related, setRelated] = useState([]);
  //   const loadRelated = () => {
  //     listRelatedBlog({ blog }).then((data) => {
  //       //console.log(data);
  //       if (data.error) {
  //         console.log(data.error);
  //       } else {
  //         setRelated(data);
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     loadRelated();
  //   }, []);

  const showServiceCharges = (service) => {
    return service.discountedServiceCharges.map((price, i) => (
      //   console.log(price.discountedServiceCharges)
      <article key={i}>
        <p className="btn btn-outline-danger mr-1 ml-1 mt-3">
          {price.discountedServiceCharges}
        </p>
      </article>
    ));
  };

  const showTools = (service) => {
    return service.tools.map((tool, i) => (
      <article key={i}>
        <p className="btn btn-outline-danger mr-1 ml-1 mt-3">
          {tool.clientPrice}
        </p>
        <p className="btn btn-outline-danger mr-1 ml-1 mt-3">{tool.tool}</p>
      </article>
    ));
  };

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div style={{ marginTop: "-30px" }} className="row">
                  <img
                    src={`${API}/api/services/photo/${service.slug}`}
                    alt={service.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <div className="container">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {service.title}
                  </h1>

                  <div className="pb-3">
                    {showServiceCharges(service)}
                    {showTools(service)}

                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6 lead">
                  {renderHTML(service.process)}
                </div>

                <div className="col-md-6 ml-6">
                  Average Ratings{service.ratingsAverage}
                </div>
              </div>
              <button
                className="mt-4 btn-lg btn-block btn btn-success"
                style={{ width: "235px" }}
              >
                Book Now
              </button>
              <button
                className="mt-4 btn-lg btn-block btn btn-success"
                style={{ width: "235px" }}
              >
                Enquiry Now
              </button>
            </div>

            {/* <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">Related Service</h4>
              <hr />
              <div className="row">{showPortFolio()}</div>
            </div> */}
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  //now all the returns are avaialble as props
  const querybuilder = query.slug;
  const data = await singleService(query.slug);

  // console.log(data);
  // console.log(query.slug);

  //console.log("getServerProps", data, context.params, context.query);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { service: data, query: querybuilder },
    };
  }
};

export default SingleService;
