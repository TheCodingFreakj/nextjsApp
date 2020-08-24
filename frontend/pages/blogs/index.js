import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesNTags } from "../../actions/blog";
//import { GetServerSideProps } from "next";
import { API } from "../../config";

const Blogs = (pageProps) => {
  console.log(pageProps); //nor coming

  const showAllBlogs = () => {
    return pageProps.blogsToBeSent.map((blog, i) => (
      <article key={i}>
        <div className="lead pb-4 ">
          <header>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h2 className=" pt-3 pb-3 font-weight-bold">{blog.title}</h2>
              </a>
            </Link>
          </header>

          <section>
            <p className="mark ml-1 pt-2 pb-2">
              Written By {blog.postedBy.name} | Published {blog.updatedAt}
            </p>
          </section>

          <section>Blog Categories and Tags</section>
          <div className="row">
            <div className="col-md-4">IMage</div>
            <div className="col-md-8">
              <section>
                <div className="pb-3">{blog.excerpt}</div>

                <Link href={`/blogs/${blog.slug}`}>
                  <a className="btn btn-success mt-2 pt-2">Read More</a>
                </Link>
              </section>
            </div>
          </div>
        </div>
        <hr />
      </article>
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
              <p>Show Categories and Tags</p>
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

  console.log(data); //This is coming fine

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: data,
    };
  }
};

export default Blogs;
