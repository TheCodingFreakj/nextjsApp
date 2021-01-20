import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleService } from "../../actions/services";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { isAuth } from "../../actions/setAuthToken";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/portfolio/serviceCard";
import ReviewForm from "../../components/reviews/submitReview";
import ShoppingTools from "../../components/shopping/shoppingTools";
import ShowModal from "../../components/utils/ModalUtils/showmodal";
import { useWindowPosition } from "../../components/utils/ModalUtils/scroller";
import ShowToolsOptions from "../../components/utils/showOptionsForTools";

const SingleService = ({ service, query }) => {
  // console.log(query);
  // console.log(service);

  const [popUpPosition, setPopupPosition] = useState(0);
  useWindowPosition().then((response) => setPopupPosition(response));

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
    // console.log(service);
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

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              {/* displaying banner image from the passed service data */}
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
                  <h3 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {service.slug}
                  </h3>

                  {/* showing the tools and the service charges */}
                  {isAuth() && isAuth().customerRole === "consumer" && (
                    //customer can see this code display
                    <>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="tools-custom">
                            <ShowToolsOptions
                              tools={service.tools}
                              basePrice={service.discountedServiceCharges}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* the content section */}
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
                  {isAuth() && isAuth().customerRole === "consumer" && (
                    //only customer can see

                    <>
                      <div className="col-md-6 lead">
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
                      </div>
                    </>
                  )}
                  <div className="col-md-6 lead">
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
            </div>

            {/* modal section */}
            {isAuth() && isAuth().customerRole === "consumer" && (
              <>
                <h4 className="text-center pt-5 pb-5 h2 ">Shop for Tools</h4>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <hr />
                      <ShowModal
                        serviceSlug={service.slug}
                        scrollPosition={popUpPosition}
                      />
                    </div>

                    <div className="col-md-12">
                      <ShoppingTools service={service} />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 mt-5">
                      <ReviewForm serviceId={service.id} />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* portfolio section */}
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">
                Have A Look At Our Work
              </h4>

              <hr />
              <div className="row">{showPortFolio(service)}</div>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

//getting the data for single service through server side rendering
//using query params(Slug) to access service so slug page
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
