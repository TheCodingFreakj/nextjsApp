import React, { useState } from "react";

import "../../static/styles.css";
import Link from "next/link";
const ToolShoppingCard = ({ service }) => {
  let product = service.tools;
  const [products, setproducts] = useState(product);

  const showTools = (products) => {
    return products.map((p) => {
      return (
        <div className="card_wrapper" key={p._id}>
          <div className="header">
            <img
              className="header_img"
              src="/static/images/marketingsolutions.jpg"
            />
            <h2>{p.tool}</h2>
            <p>{p.summary}</p>
            <div className="footer">
              <p>{p.clientPrice} $ per 30 days </p>
              <Link href={`/products?productId=${p._id}`}>
                <a className="btn btn-small btn-success">User Update</a>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="tools_wrapper">{showTools(products)}</div>
    </>
  );
};

export default ToolShoppingCard;
