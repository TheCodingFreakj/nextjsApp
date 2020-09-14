import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
//import { listBlogsWithCategoriesNTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";

const ServiceCards = () => {
  const showAllServicePackages = () => {
    return (
      <div>
        This is the container where i will show service packages called the card
        componenet
      </div>
    );
    //  return pageProps.blogsToBeSent.map((blog, i) => (
    // <div className="container pt-9 key={i}">

    //   <div className="row">
    //     <div className="col-md-3 pl-5">
    //       <ul className="list-group">

    //         <li className="list-group-item">
    //
    //           <Card />
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>;
    //  )
  };
  return (
    <React.Fragment>
      <main>
        <div className="container-fluid">{showAllServicePackages()}</div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  //data required here
};

export default withRouter(ServiceCards);
