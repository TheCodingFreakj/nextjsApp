import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Private from "../../components/private";

//bring components

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User DashBoard</h2>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="user/blogs">
                    <a>Create Blogs</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/user/blog">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
