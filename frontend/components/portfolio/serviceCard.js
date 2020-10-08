import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ service }) => {
  console.log(service);
  //   const portfolio = service.the_portfolios;
  //   const showPriceList = () => {
  //     return service.discountedServiceCharges.map((price, i) => (
  //       <p className="card-text" key={i}>
  //         {price.discountedServiceCharges}
  //       </p>
  //     ));
  //   };
  return (
    <div className="card">
      {/* <section>
        <Link href={`/services/${service.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ height: "250px", width: "100%" }}
              src={`${API}/api/services/photo/${service.slug}`}
              alt={portfolio.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/services/${service.slug}`}>
            <a>
              <h5 className="card-title">{portfolio.company}</h5>
            </a>
          </Link>

          <div>
            <p className="card-text ">{portfolio.technicalSheet}</p>
          </div>
        </section>
      </div>

      <div className="card-body p-3 mb-2 bg-success text-white">
        <div className="p-3 mb-2 bg-warning text-dark">
          <p className="card-text">
            Duration:
            {portfolio.name}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SmallCard;
