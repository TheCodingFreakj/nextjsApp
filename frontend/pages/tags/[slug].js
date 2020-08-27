//This page chnahes based on router and slug

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getSingleTag } from "../../actions/tags";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import category from "../../../backend/models/category";
import Card from "../../components/blogs/card";

const TagPage = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name="description" content={`best insights for ${tag.name}`} />

      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />

      <meta
        property="og:description"
        content={`best insights for ${tag.name}`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/marketingsolutions.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/marketingsolutions.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>

                {blogs.map((blog, i) => (
                  <Card key={i} blog={blog} />
                ))}

                {/* {JSON.stringify(blogs)} */}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  //console.log(query.slug);
  //now all the returns are avaialble as props
  const querybuilder = query.slug;
  const data = await getSingleTag(query.slug);

  //console.log(data);

  //console.log("getServerProps", data, context.params, context.query);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { tag: data.tag, blogs: data.blogs, query: querybuilder },
    };
  }
};

export default TagPage;
