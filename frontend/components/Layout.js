import React from "react";
import Head from "next/head";
import HeadContent from "./HeadContent";
import Header from "../components/Header";

const Layout = ({ children }) => {
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
        <title>ReactReserve</title>
      </Head>
      <Header />
      {children}

      <h1>Footer</h1>
    </div>
  );
};

export default Layout;
