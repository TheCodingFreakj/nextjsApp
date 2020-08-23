import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import Admin from "../../../../components/admin";
import BlogComponent from "../../../../components/blogs/blog";

//bring components

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create New post </h2>
            </div>

            <div className="col-md-12">
              <BlogComponent />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
