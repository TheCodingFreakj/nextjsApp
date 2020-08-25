import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesNTags } from "../../actions/blog";

import Card from "../../components/blogs/card";

const Blogs = (pageProps) => {
  console.log(pageProps); //nor coming

  const showAllBlogs = () => {
    return pageProps.blogsToBeSent.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  const showAllCategories = () => {
    return pageProps.categoriesToBeSent.map((cat, i) => (
      <Link key={i} href={`/categories/${cat.slug}`}>
        <a className="btn btn-success mr-1 ml-1 mt-3">{cat.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return pageProps.tagsToBeSent.map((tag, i) => (
      <Link key={i} href={`/categories/${tag.slug}`}>
        <a className="btn btn-success mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };
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
              <div className="pb-5 text-center">
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </section>
          </header>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  //now all the returns are avaialble as props

  const data = await listBlogsWithCategoriesNTags();

  //console.log(data); //This is coming fine

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: data,
    };
  }
};

export default Blogs;
