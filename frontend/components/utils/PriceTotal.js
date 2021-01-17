import React from "react";

const PriceTotal = (props) => {
  // console.log(props);
  let subtotal = props.checkedtoolinfo.subtotal;
  let total = props.checkedtoolinfo.total;

  let price = total
    ? total + props.servicebaseprice
    : subtotal + props.servicebaseprice;

  return (
    <React.Fragment>
      <div className="price-calc-container">
        <p>Your estimated price</p>
        <div className="price-calc">{price}</div>
      </div>
    </React.Fragment>
  );
};

export default PriceTotal;
