//This is individual Page to show services

//ratings
//reviews by brands
//Explanation of how we  can help
//related work or portfolio

//This page chnahes based on router and slug

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleService } from "../../actions/services";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { isAuth } from "../../actions/setAuthToken";
import { bookService } from "../../actions/stripe";
import { getCookie } from "../../actions/setAuthToken";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/portfolio/serviceCard";
import ReviewForm from "../../components/reviews/submitReview";
import ShoppingTools from "../../components/shopping/shoppingTools";
import ShowModal from "../../components/utils/showmodal";
import { useWindowPosition } from "../../components/utils/scroller";

const SingleService = ({ service, query }) => {
  // console.log(query);
  // console.log(service);

  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedTool, setCheckedTool] = useState([]);
  const [total, setTotal] = useState([]);
  const [subtotal, setSubTotal] = useState([]);
  const [totalPrice, setTotalPrice] = useState(""); //send this totalPrice in to the backend as ?price={totalPrice}
  const [popUpPosition, setPopupPosition] = useState(0);

  const token = getCookie("token");

  useWindowPosition().then((response) => setPopupPosition(response));

  const showServiceCharges = (service) => {
    let addPrice = "";
    const addTotalServices = (price, total) => {
      addPrice = price + total;
      return addPrice;
    };

    let subPrice = "";
    const subTotalServices = (price, subtotal) => {
      subPrice = price + subtotal;
      return subPrice;
    };
    const increment = (name) => (e) => {
      setTotalPrice({
        ...totalPrice,
        [name]: e.target.value,
      });
    };

    const decrement = (name) => (e) => {
      setTotalPrice({
        ...totalPrice,
        [name]: e.target.value,
      });
    };

    return service.discountedServiceCharges.map((price, i) => (
      <div key={i} className="container">
        <div className="row">
          <h4>Click Once After you Decide :Price Add</h4>

          <button
            className="btn btn-outline-danger mx-auto font-weight-bold "
            style={{ width: "700px" }}
            role="link"
            name="choosenPriceFrontEnd"
            type="submit"
            value={addTotalServices(price.discountedServiceCharges, total)}
            onClick={increment("choosenPriceFrontEnd")}
          >
            {addTotalServices(price.discountedServiceCharges, total)} $
          </button>

          <br />
        </div>
        <div className="row">
          <h4>Click Once After you Decide : Price Cut</h4>

          <button
            className="btn btn-outline-danger mx-auto font-weight-bold "
            style={{ width: "700px" }}
            role="link"
            name="choosenPriceFrontEnd"
            type="submit"
            value={subTotalServices(price.discountedServiceCharges, subtotal)}
            onClick={decrement(
              subTotalServices(price.discountedServiceCharges, subtotal)
            )}
          >
            {subPrice} $
          </button>
        </div>
      </div>
    ));
  };

  const showPortFolio = (service) => {
    return service.the_portfolios.map((portfolio, i) => (
      <div key={i} className="col-md-4">
        <article>
          <SmallCard service={portfolio} />
        </article>
      </div>
    ));
  };

  const showReviews = (service) => {
    return service.the_reviews.map((review, i) => (
      <div key={i} className="card">
        <div className="card-body p-3 mb-2 bg-success text-white">
          <p className="card-text">{review.review}</p>
          <p className="card-text">Average Rating : {review.rating}</p>
          <p className="card-text">Given By : {review.reviewedBy}</p>
          <p className="card-text"> {moment(review.createdAt).fromNow()}</p>
        </div>
      </div>
    ));
  };

  const handlePriceToggle = (tool) => {
    const clickedId = checkedTool.indexOf(tool._id);
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
      reducedPrice.splice(clickedId, 1);
      setCheckedPrice(reducedPrice);
      let subtotal = reducedPrice.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
      setSubTotal(subtotal);
    }
    setCheckedTool(allTools);
    setTotal(total);
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

                  {isAuth() && isAuth().customerRole === "consumer" && (
                    //Admin
                    <>
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

                        <br />
                        <br />
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 lead">
                  <h2>Summary</h2>
                  {renderHTML(service.process)}
                </div>

                <div className="col-md-4 ml-6">
                  <h2>Ratings</h2>
                  Average Ratings{service.ratingsAverage}
                </div>

                <div className="col-md-4 lead ">
                  <h2>What they think of Us</h2>
                  <hr />
                  <div className="row">{showReviews(service)}</div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-6 lead">
                    {isAuth() && isAuth().customerRole === "consumer" && (
                      //Admin

                      <>
                        <div className="col-md-6  text-center  lead">
                          <Link
                            href={`/services/service?serviceId=${service._id}`}
                          >
                            <a
                              className="mt-4 btn-lg btn-block btn btn-success"
                              style={{ width: "235px" }}
                            >
                              Shop Now
                            </a>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="col-md-6  text-center  lead">
                    <Link href="">
                      <a
                        className="mt-4 btn-lg btn-block btn btn-success"
                        style={{ width: "235px" }}
                      >
                        Enquiry Now
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">
                Have A Look At Our Work
              </h4>

              <hr />
              <div className="row">{showPortFolio(service)}</div>
            </div>
            <h4 className="text-center pt-5 pb-5 h2 ">Shop for Tools</h4>
            <hr />
            <ShowModal
              serviceSlug={service.slug}
              scrollPosition={popUpPosition}
            />
            <ShoppingTools service={service} />
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">Related Service</h4>
              <hr />
              <div className="row">
                <ReviewForm serviceId={service.id} />
              </div>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};
//pyadav@gmail.com
export const getServerSideProps = async ({ query }) => {
  const querybuilder = query.slug;
  const data = await singleService(query.slug);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { service: data, query: querybuilder },
    };
  }
};

export default SingleService;
