import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Private from "../../../components/private";
import BlogComponent from "../../../components/blogs/blog";

//bring components

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new blog </h2>
            </div>

            <div className="col-md-12">
              <BlogComponent />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
