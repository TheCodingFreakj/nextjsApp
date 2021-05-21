import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Admin from "../../components/admin";
import admin from "../../static/admin.css";
//bring components

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <h2>Admin DashBoard</h2>

        <div className="main_container">
          <div className="flex-item-upper">
            <h2>UserPr section</h2>
            <Link href="/admin/adminUpdate">
              <a className=" btn btn-small btn-success">Update Profile</a>
            </Link>
          </div>

          <div className="flex-item-upper">
            <h2>show all customers</h2>
          </div>
          <div className="flex-item-upper">
            <h2>show all users</h2>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              <h2>Blog section</h2>
              <p>Blog Create</p>
              <Link href="/admin/crud/blogs">
                <a className=" btn btn-small btn-success">Create </a>
              </Link>
              <p>Update/Delete</p>
              <Link href="/admin/crud/blogs/blog">
                <a className=" btn btn-small btn-success">Up/Del</a>
              </Link>
              <p>Create </p>
              <Link href="/admin/crud">
                <a className=" btn btn-small btn-success">Category</a>
              </Link>

              <p>Create</p>
              <Link href="/admin/crud">
                <a className=" btn btn-small btn-success">Tags</a>
              </Link>
            </div>
            <div className="flex-item">
              <h2>Services section</h2>
              <p>Serbives</p>
              <Link href="/admin/services">
                <a className=" btn btn-small btn-success">Create</a>
              </Link>
              <p>Update/Delete</p>
              <Link href="/admin/services/crud/service">
                <a className=" btn btn-small btn-success">Upd/Del</a>
              </Link>
              <p>prices</p>
              <Link href="/admin/price">
                <a className=" btn btn-small btn-success">Price Up</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/price/crud/price">
                <a className=" btn btn-small btn-success">Upd/Del Price</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/crud/packages">
                <a className=" btn btn-small btn-success">Combo-Packages</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/crud/packages/pack">
                <a className=" btn btn-small btn-success">Upd/Del</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/marketingTools">
                <a className=" btn btn-small btn-success">Tools</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/marketingTools/crud/tool">
                <a className=" btn btn-small btn-success">Update</a>
              </Link>
            </div>
            <div className="flex-item">
              <h2>Portfolio section</h2>
              <Link href="/admin/portfolio">
                <a className=" btn btn-small btn-success">Portfolios</a>
              </Link>
              <p>Create</p>
              <Link href="/admin/portfolio">
                <a className=" btn btn-small btn-success">Update </a>
              </Link>
              <p>Create</p>
              <Link href="/admin/reviews">
                <a className=" btn btn-small btn-success">Create Reviews</a>
              </Link>
            </div>
            <div className="flex-item">
              <h2>Products section</h2>
              <Link href="/admin/products">
                <a className=" btn btn-small btn-success">
                  Create Shopping Product
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
