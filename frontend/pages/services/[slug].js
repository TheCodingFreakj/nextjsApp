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
  // console.log(query);
  // console.log(service);
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
  const [checkedPrice, setCheckedPrice] = useState([]);
  const showServiceCharges = (service) => {
    return service.discountedServiceCharges.map((price, i) => (
      <div key={i} className="container">
        <div className="row">
          <h4>Price Range :</h4>
          <div
            className="btn btn-outline-danger mx-auto font-weight-bold "
            style={{ width: "700px" }}
          >
            <h5>{price.discountedServiceCharges}</h5>
          </div>
        </div>
      </div>
    ));
  };

  const handlePriceToggle = (price, tid) => {
    // console.log(price);

    checkedPrice.push(price);

    let choosenPrices = "";
    choosenPrices = [...checkedPrice];
    console.log("The choosen Ones", choosenPrices);
    if (checkedPrice) {
      for (let i = 0; i < checkedPrice.length; i++) {
        const price = checkedPrice[i] + checkedPrice[i - 1];
        console.log(price);
      }
    } else {
      choosenPrices.splice(checkedPrice.indexOf(tid), 1);
    }

    setCheckedPrice(choosenPrices);
    console.log("The updated Price", checkedPrice);
  };

  const showTools = (service) => {
    return service.tools.map((tool, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handlePriceToggle(tool.clientPrice, tool._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">
          <h5>
            {tool.tool} : {tool.clientPrice} $
          </h5>
        </label>
      </li>
    ));
  };

  // const showTotalPrice = () => {
  //   return checkedPrice.map((price, i) => (
  //     // console.log(price)
  //     <div
  //       key={i}
  //       className="btn btn-outline-danger mx-auto font-weight-bold "
  //       style={{ width: "700px" }}
  //     >
  //       <h5>{price}</h5>
  //     </div>
  //   ));
  // };

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

                  <div className="container-fluid">
                    {showServiceCharges(service)}

                    <br />
                    <br />
                  </div>

                  <div className="container-fluid">
                    {showTools(service)}
                    {JSON.stringify(checkedPrice)}
                    {/* <div>{showTotalPrice()}</div> */}

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
