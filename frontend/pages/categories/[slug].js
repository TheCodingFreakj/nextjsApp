//This page chnahes based on router and slug

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getSingleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import category from "../../../backend/models/category";

const CategoryPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">Cat</h1>
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  console.log(query);
  //now all the returns are avaialble as props

  const data = await getSingleCategory(query);

  console.log(data);

  //console.log("getServerProps", data, context.params, context.query);

  return { props: { category: data } };

  //   if (data.error) {
  //     console.log(data.error);
  //   } else {
  //     return {
  //       props: { category: data },
  //     };
  //   }
};

export default CategoryPage;
