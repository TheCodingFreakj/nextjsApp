import React from "react";
import Head from "next/head";
import HeadContent from "./HeadContent";
import Header from "../components/Header";
import Footer from "../components/footer";

const Layout = ({ children }) => {
  //console.log(children);

  return (
    <div>
      <Head>
        <HeadContent />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <link href="/static/styles.css" rel="stylesheet" />
        <title>My Next Website App </title>
      </Head>

      <Header />

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
