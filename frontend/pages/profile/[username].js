//This page chnahes based on router and slug

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getUserPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { withRouter } from "next/router";
import moment from "moment";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs By ${user.username}`} />

      <link rel="canonical" href={`${DOMAIN}/profile//${query.username}`} />
      <meta property="og:title" content={`${user.name} | ${APP_NAME}`} />

      <meta property="og:description" content={`Blogs By ${user.username}`} />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/profile//${query.username}`}
      />
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

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="mr-4 mb-4">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>{user.name}</h5>
                  <Link href={`${user.profile}`}>
                    <a>View Profile Page</a>
                  </Link>
                  <p className="text-muted">
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title  bg-success text-warning pt-4 pb-4 pl-4 pr-4">
                    Recent Blogs By {user.name}
                  </h5>

                  <br />
                  <p>{showUserBlogs()}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-success text-warning pt-4 pb-4 pl-4 pr-4">
                    Message {user.name}
                  </h5>

                  <br />
                  <p>Contact Form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  //now all the returns are avaialble as props
  const querybuilder = query.username;
  const data = await getUserPublicProfile(query.username);

  //console.log(data);
  // console.log(query.slug);

  //console.log("getServerProps", data, context.params, context.query);

  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { user: data.user, blogs: data.blogs, query: querybuilder },
    };
  }
};

export default UserProfile;
