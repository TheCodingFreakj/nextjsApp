import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { API } from "../../config";
const Product = ({ product }) => {
  console.log(product);
  return <Layout>Producst</Layout>;
};
Product.getInitialProps = async ({ query: { productId } }) => {
  //get the product from collecruon based on id

  const url = `${API}/api/tool`;
  const payload = { params: { productId } };

  const response = await axios.get(url, payload);
  //   console.log(response);
  return { product: response.data };
};
export default Product;
