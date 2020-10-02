import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Admin from "../../components/admin";

//bring components

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Admin DashBoard</h2>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud">
                    <a>Create Category</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  {/* <Link href="/admin/crud"> */}
                  <a href="/admin/crud">Create Tags</a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Create Blogs</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs/blog">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/adminUpdate">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/services">
                    <a>Create Services</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/services/crud/service">
                    <a>Update/Delete Services</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/toolsBrands">
                    <a>Create Marketing Tools Options</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/reviews">
                    <a>Create Reviews</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/packages">
                    <a>Create Combo-Packages</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="">
                    <a>Update/Delete Combo-Packages</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/price">
                    <a>Price Updates</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
