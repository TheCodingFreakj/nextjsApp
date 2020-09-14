import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Card from "../../components/services/ServiceCards/serviceCards";
const ServiceCards = () => {
  return (
    <div className="container ml-5 pt-9">
      <div className="row">
        <div className="col-md-4 pl-5">
          <ul className="list-group">
            <li className="list-group-item">
              <Link href="">
                <a>
                  <button className="btn btn-success">Monthly</button>
                </a>
              </Link>
              <div className="row">
                <div className="col-md-4 pl-5">
                  <Card />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-md-4">
          <ul className="list-group">
            <li className="list-group-item">
              <Link href="">
                <a>
                  <button className="btn btn-success">12 Months -18 %</button>
                </a>
              </Link>

              <div className="row">
                <div className="col-md-4 pl-5">
                  <Card />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-md-4">
          <ul className="list-group">
            <li className="list-group-item">
              <Link href="">
                <a>
                  <button className="btn btn-success">24 Months -30 %</button>
                </a>
              </Link>
              <div className="row">
                <div className="col-md-4 pl-5">
                  <Card />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
