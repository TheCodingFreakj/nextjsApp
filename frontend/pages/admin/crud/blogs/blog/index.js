import React from "react";
import Link from "next/link";
import Layout from "../../../../../components/Layout";
import Admin from "../../../../../components/admin";
import ReadBlogs from "../../../../../components/blogs/readblog";

//bring components

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Blog Posts-Update and Delete </h2>
            </div>

            <div className="col-md-12">
              <ReadBlogs />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
