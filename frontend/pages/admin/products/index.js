import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import CreateShoppingProducts from "../../../components/shopping/shoppingProducts";

//bring components

const ShoppingProducts = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create Products </h2>
            </div>

            <div className="col-md-12">
              <CreateShoppingProducts />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ShoppingProducts;
