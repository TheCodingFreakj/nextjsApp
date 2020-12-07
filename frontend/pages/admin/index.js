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
                    <a className=" btn btn-small btn-success">
                      Create Category
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  {/* <Link href="/admin/crud"> */}
                  <a href="/admin/crud" className=" btn btn-small btn-success">
                    Create Tags
                  </a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a className=" btn btn-small btn-success">Create Blogs</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs/blog">
                    <a className=" btn btn-small btn-success">
                      Update/Delete Blogs
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/adminUpdate">
                    <a className=" btn btn-small btn-success">Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/services">
                    <a className=" btn btn-small btn-success">
                      Create Services
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/services/crud/service">
                    <a className=" btn btn-small btn-success">
                      Update/Delete Services
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/price">
                    <a className=" btn btn-small btn-success">
                      Service Price Updates
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/price/crud/price">
                    <a className=" btn btn-small btn-success">
                      Update/Delete Service Price
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/packages">
                    <a className=" btn btn-small btn-success">
                      Create Combo-Packages
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/packages/pack">
                    <a className=" btn btn-small btn-success">
                      Update/Delete Combo-Packages and CombopackagePrice
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/packages/pack">
                    <a className=" btn btn-small btn-success">
                      Update/Delete CombopackagePrice
                    </a>
                  </Link>
                </li>
              </ul>
            </div> */}

            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/marketingTools">
                    <a className=" btn btn-small btn-success">
                      Create Marketing Tools Options
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/marketingTools/crud/tool">
                    <a className=" btn btn-small btn-success">
                      Update Marketing Tools Options
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/portfolio">
                    <a className=" btn btn-small btn-success">Portfolios</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/portfolio">
                    <a className=" btn btn-small btn-success">
                      Update Portfolios
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/reviews">
                    <a className=" btn btn-small btn-success">Create Reviews</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/products">
                    <a className=" btn btn-small btn-success">
                      Create Shopping Product
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            {/* 
            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud">
                    <a className=" btn btn-small btn-success">
                      Update Shopping Product
                    </a>
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
//pallavy57
