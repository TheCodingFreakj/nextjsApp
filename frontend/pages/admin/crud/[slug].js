import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import UpdateBlog from "../../../components/blogs/updateBlog";

//bring components

const Blog = () => {
  return (
    <Layout>
      <Admin>
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
      </Admin>
    </Layout>
  );
};
export default Blog;
