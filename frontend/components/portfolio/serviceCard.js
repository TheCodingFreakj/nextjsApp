import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ service }) => {
  //console.log(service);

  return (
    <div className="card">
      <section>
        <Link href={`/services/${service.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ height: "250px", width: "100%" }}
              src={`${API}/api/portfolios/photo/${service.slug}`}
              alt={service.name}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/services/${service.slug}`}>
            <a>
              <h5 className="card-title">{service.company}</h5>
            </a>
          </Link>

          <div>
            <p>Technical Details</p>
            <p className="card-text ">{service.technicalSheet}</p>
          </div>
        </section>
      </div>

      <div className="card-body p-3 mb-2 bg-success text-white">
        <div className="p-3 mb-2 bg-warning text-dark">
          <h5>Service Name</h5>
          <p className="card-text">{service.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
