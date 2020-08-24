import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { API } from "../../config";

const ContactPage = () => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Contact Form
              </h1>
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};

export default ContactPage;
