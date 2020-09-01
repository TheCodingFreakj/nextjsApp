import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Private from "../../../components/private";
import ReadBlogs from "../../../components/blogs/readblog";
import { isAuth } from "../../../actions/setAuthToken";

//bring components

const Blog = () => {
  //Here is the usermane
  const username = isAuth() && isAuth().username;
  console.log("This is the username I got from", username);

  // const userId = isAuth() && isAuth()._id;
  // console.log("This is the username I got from", userId);
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blog Posts-Update and Delete </h2>
            </div>

            <div className="col-md-12">
              <ReadBlogs username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
