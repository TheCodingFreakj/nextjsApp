import React from "react";
import Head from "next/head";
import HeadContent from "./HeadContent";
import Header from "../components/Header";
import CustomerHeader from "../components/customer/customerHeader";
import { isAuth } from "../actions/setAuthToken";

const Layout = ({ children }) => {
  const renderHeader = () => {
    if (isAuth() && isAuth().customerRole === "consumer") {
      return <CustomerHeader />;
    } else if (isAuth() && isAuth().role !== 0) {
      return <Header />;
    } else if (isAuth() && isAuth().role !== 1) {
      return <Header />;
    } else {
      return <Header />;
    }
  };
  return (
    <div>
      <Head>
        <HeadContent />
        {/* Stylesheets
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" /> */}
        {/* <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />

        {/* <link
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          rel="stylesheet"
        /> */}

        <link href="/static/styles.css" rel="stylesheet" />
        <title>My Next Website App </title>
      </Head>
      {renderHeader()}
      {/* <Header /> */}
      {/* if(isAuth() && isAuth().customerRole === "consumer"){<CustomerHeader />}
      else {<Header />} */}
      {children}
      <h1>Footer</h1>
    </div>
  );
};

export default Layout;
