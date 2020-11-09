import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { API } from "../../config";
import { Container } from "semantic-ui-react";
import ProductAttribute from "../../components/productPageComponents/productattribute";
import ProductSummary from "../../components/productPageComponents/productsummary";
const Product = ({ product }) => {
  console.log(product);
  return (
    <Layout>
      <React.Fragment>
        <Container>
          <ProductSummary {...product} />
          <ProductAttribute {...product} />
        </Container>
      </React.Fragment>
    </Layout>
  );
};
Product.getInitialProps = async ({ query: { productId } }) => {
  //get the product from collecruon based on id

  const url = `${API}/api/tool`;
  const payload = { params: { productId } };

  const response = await axios.get(url, payload);
  return { product: response.data };
};
export default Product;
