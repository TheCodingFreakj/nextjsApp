//This page chnahes based on router and slug

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleBlog, listRelatedBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blogs/smallcard";

const SingleBlog = ({ blog, query }) => {
  //   console.log(query);

  const [related, setRelated] = useState([]);
  const loadRelated = () => {
    listRelatedBlog({ blog }).then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />

      <link rel="canonical" href={`${DOMAIN}/blogs/${query}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />

      <meta property="og:description" content={blog.mdesc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${API}/api/blog/photo/${blog.slug}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${API}/api/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  const showBlogCategories = (blog) => {
    return blog.categories.map((cat, i) => (
      <Link key={i} href={`/categories/${cat.slug}`}>
        <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{cat.name}</a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.categories.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-danger mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };
  //   console.log(blog);

  const showRelatedBlogs = () => {
    return related.map((blog, i) => (
      <div key={i} className="col-md-4">
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div style={{ marginTop: "-30px" }} className="row">
                  <img
                    src={`${API}/api/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <div className="container">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mark mt-3">
                    Written By {blog.postedBy.name} | Published
                    {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}

                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2 ">Related Blogs</h4>
              <hr />
              {/* {JSON.stringify(related)} */}
              <div className="row">{showRelatedBlogs()}</div>
            </div>

            <div className="container pb-5">
              <hr />
              <p>Show Comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  //now all the returns are avaialble as props
  const querybuilder = query.slug;
  const data = await singleBlog(query.slug);

  // console.log(data);
  // console.log(query.slug);

  //console.log("getServerProps", data, context.params, context.query);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { blog: data, query: querybuilder },
    };
  }
};

export default SingleBlog;
