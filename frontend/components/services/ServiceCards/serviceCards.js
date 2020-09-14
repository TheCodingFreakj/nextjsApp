import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Card = ({ comboPackage }) => {
  const [service, setService] = useState({
    serviceOptions: "",
  });

  const { serviceOptions } = service;

  const onChange = (name) => (e) => {
    //you have to change the value place based on what service they choose
  };
  return (
    <React.Fragment>
      <div className="lead pb-4 ">
        {/* <button className="btn btn-success"></button> */}
        <header>
          title here
          {/* <Link href={`/combo-packages/${comboPackage.slug}`}>
          <a>
            <h2 className=" pt-3 pb-3 font-weight-bold">{comboPackage.title}</h2>
          </a>
        </Link> */}
        </header>

        <section>
          <p>
            Describe here
            {/* {comboPackage.desc} */}
          </p>
        </section>

        <section>
          <div className="form-group">
            <label className="text-muted">
              <p>choose the services</p>
            </label>
            <select
              name="serviceOptions"
              className="form-control"
              type="text"
              value={serviceOptions}
              onChange={onChange("serviceOptions")}
            >
              <option value="0"> * Service Option</option>
              <option value="contentWriting">Content Marketing</option>
              <option value="funnelMarketing">Funnel Marketing</option>
              <option value="emailMarketing">Email Marketing</option>
            </select>
          </div>
        </section>

        <section>
          <p>
            <h2>Price Here (Calculate this based on service choose)</h2>
          </p>
        </section>

        <section>
          <p>
            Includes: Email marketing Autoresponders Unlimited landing pages
            Unlimited automation templates Sales funnels (1 funnel) Unlimited
            lead funnels Facebook Ads Sell e-products Price here
          </p>
        </section>
      </div>

      <button className="btn btn-success">Book Now</button>
    </React.Fragment>
  );
};

//https://secure.getresponse.com/pricing/en?_ga=2.176755109.1251534595.1599641268-10827509.1599641268
export default Card;
