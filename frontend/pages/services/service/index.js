import React from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { API } from "../../../config";
import { Container } from "semantic-ui-react";
import ServiceSummary from "../../../components/productPageComponents/serviceattribute";
import ServiceAttribute from "../../../components/productPageComponents/servicesummary";
const Product = ({ service }) => {
  // console.log(service);
  return (
    <Layout>
      <React.Fragment>
        <Container>
          <ServiceAttribute {...service} />
          <ServiceSummary {...service} />
        </Container>
      </React.Fragment>
    </Layout>
  );
};
Product.getInitialProps = async ({ query: { serviceId } }) => {
  const url = `${API}/api/service`;
  const payload = { params: { serviceId } };
  const response = await axios.get(url, payload);
  return { service: response.data };
};
export default Product;
