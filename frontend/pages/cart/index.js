import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

//bring components

const Cart = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Your Cart </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;