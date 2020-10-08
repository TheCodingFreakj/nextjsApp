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
import SmallCard from "../../components/portfolio/serviceCard";

const SingleService = ({ service, query }) => {
  //console.log(query);
  //console.log(service.the_portfolios);

  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedTool, setCheckedTool] = useState([]);
  const [total, setTotal] = useState([]);
  const [subtotal, setSubTotal] = useState([]);

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

  const showPortFolio = (service) => {
    return service.the_portfolios.map((portfolio, i) => (
      <div key={i} className="col-md-4">
        <article>
          <SmallCard service={service.the_portfolios} />
        </article>
      </div>
    ));
  };

  const handlePriceToggle = (tool) => {
    const clickedId = checkedTool.indexOf(tool._id);
    // console.log("This is clickedid", clickedId);
    const allTools = [...checkedTool];

    let total = 0;

    if (clickedId === -1) {
      allTools.push(tool._id);
      checkedPrice.push(tool.clientPrice);
      const choosenPrice = [...checkedPrice];

      for (let i = 0; i < choosenPrice.length; i++) {
        if (choosenPrice[i]) {
          total = choosenPrice[i] + total;
        }
      }
    } else {
      allTools.splice(clickedId, 1);

      const reducedPrice = [...checkedPrice];
      // console.log(reducedPrice);

      reducedPrice.splice(clickedId, 1);
      // subtotal = reducedPrice[i] + subtotal;
      // console.log(reducedPrice);
      setCheckedPrice(reducedPrice);

      let subtotal = reducedPrice.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);

      // console.log(subtotal);
      setSubTotal(subtotal);
    }
    setCheckedTool(allTools);
    // console.log("This is updated tools", allTools);
    setTotal(total);

    // console.log("The total is", total);
    // console.log("The subtotal is", subtotal);
  };

  const showTools = (service) => {
    return service.tools.map((tool, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handlePriceToggle(tool)}
          type="checkbox"
          name="checkbox"
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
                    <div className="row">
                      <div className="col-md-4 pt-5 pb-5">
                        {showTools(service)}
                      </div>
                      <div className="col-md-8 pt-5 pb-5">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-3  pb-5">
                              <p>Add to see the totalPrice</p>
                              <button
                                className="mt-4 btn-lg btn-block btn btn-success"
                                style={{ width: "100px" }}
                              >
                                {total}
                              </button>
                              {/* <h2>{total}</h2> */}
                            </div>
                            <div className="col-md-3  pb-5">
                              <p>Deduct to see the totalPrice</p>

                              <button
                                className="mt-4 btn-lg btn-block btn btn-success"
                                style={{ width: "100px" }}
                              >
                                {subtotal}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <h4>{JSON.stringify(total)}</h4> */}
                    {/* <h4>{JSON.stringify(subtotal)}</h4> */}
                    {/* <h4>{JSON.stringify(checkedTool)}</h4>
                    <h4>{JSON.stringify(checkedPrice)}</h4> */}
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

              <div className="container">
                <div className="row">
                  <div className="col-md-6 lead">
                    <button
                      className="mt-4 btn-lg btn-block btn btn-success"
                      style={{ width: "235px" }}
                    >
                      Book Now
                    </button>
                  </div>
                  <div className="col-md-6 lead">
                    <button
                      className="mt-4 btn-lg btn-block btn btn-success"
                      style={{ width: "235px" }}
                    >
                      Enquiry Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">Related Service</h4>
              <hr />
              <div className="row">{showPortFolio(service)}</div>
            </div>
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
