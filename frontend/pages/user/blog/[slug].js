import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Private from "../../../components/private";
import UpdateBlog from "../../../components/blogs/updateBlog";

//bring components

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update the Blogs </h2>
            </div>

            <div className="col-md-12">
              <UpdateBlog />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default Blog;
