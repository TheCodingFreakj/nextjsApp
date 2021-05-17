import React from "react";
import Layout from "../../../components/Layout";
import { isAuth } from "../../../actions/setAuthToken";
import OrderSummary from "../../../components/payment/orders/ordersummary";
const Orders = () => {
  const user = isAuth();

  return (
    <Layout>
      <React.Fragment>
        <OrderSummary />
      </React.Fragment>
    </Layout>
  );
};

export default Orders;
