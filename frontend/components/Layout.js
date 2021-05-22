import React from "react";
import Head from "next/head";
import HeadContent from "./HeadContent";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className=" container-md-2">
      <Head>
        <HeadContent />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
          rel="stylesheet"
        />

        <link href="/static/styles.css" rel="stylesheet" />
        <title>My Next Website App </title>
      </Head>
      <Header />

      {children}
      <div className="footer_content">
        <div className="flex-container">
          <ul>
            <li>
              <a href="http://www.semantic-ui.com">Semantic UI</a>
            </li>
            <li>
              <a href="http://www.semantic-ui.com">New York</a>
            </li>
            <li>
              <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
            </li>

            <li>
              <a href="http://www.semantic-ui.com">semantic-ui.com</a>
            </li>
          </ul>
        </div>
        <div className="flex-container">
          <ul>
            <li>
              <a href=""> Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>

            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex-container">
          <form>
            <input type="text" />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Layout;
