import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesNTags } from "../../actions/blog";
import { API } from "../../config";

const Blogs = () => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                You one place for marketing insights
              </h1>
            </div>

            <section>
              <p>Show Categories and Tags</p>
            </section>
          </header>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">Show all Blogs</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blogs;
