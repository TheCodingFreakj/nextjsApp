import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import CreateReviews from "../../../components/reviews/CreateReviews";

//bring components

const Reviews = () => {
  return (
    <React.Fragment>
      <Layout>
        <Admin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 pt-5 pb-5">
                <h2>Create New Review Card </h2>
              </div>

              <div className="col-md-12">
                <CreateReviews />
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </React.Fragment>
  );
};

export default Reviews;
