import React from "react";

const ShowPricings = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4  pb-5">
            <p>Add to see the totalPrice for tools only</p>
            <button
              className="mt-4 btn-lg btn-block btn btn-success"
              style={{ width: "200px" }}
            >
              {props.total}
            </button>
          </div>
          <div className="col-md-4  pb-5">
            <p>Deduct to see the totalPrice for tools only </p>

            <button
              className="mt-4 btn-lg btn-block btn btn-success"
              style={{ width: "200px" }}
            >
              {props.subtotal}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowPricings;
