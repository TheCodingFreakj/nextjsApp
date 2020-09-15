import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Card = ({ comboPackage }) => {
  // comboPackage: {
  //   (packageName = ""),
  //     (slug = ""),
  //     (title = ""),
  //     (desc = ""),
  //     (BundleOptions = "");
  //     packagePrice="", getToolClientPrice + servicePrice
  //     serviceDescription:""

  // }
  const [service, setService] = useState({
    serviceOptions: "",
  });

  const { serviceOptions } = service;

  // const calcServicePrice = () => {

  //   //get the results of getToolClientPrice
  //   //packagePrice="", getToolClientPrice + servicePrice

  // }
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

        {/* <section>
          <div className="form-group">
            <label className="text-muted">
              <p>Customize your Service</p>
            </label>
            <select
              name="serviceOptions"
              className="form-control"
              type="text"
              value={serviceOptions}
              onChange={onChange("serviceOptions")}
            >
              <option value="0"> * Service Options</option>
              <option value="packagePartOne">BundleOne</option>
              <option value="packagePartTwo">BundleTwo</option>
              <option value="packagePartThree">BundleThree</option>
              <option value="packagePartFive">BundleFour</option>
            </select>
          </div>
        </section> */}

        <section>
          <p>{/* <h2> {calcServicePrice()}</h2> */}</p>
        </section>

        <section>
          <p>{/* {comboPackage.serviceDescription} */}</p>
        </section>
      </div>

      <button className="btn btn-success">Book Now</button>
    </React.Fragment>
  );
};

//https://secure.getresponse.com/pricing/en?_ga=2.176755109.1251534595.1599641268-10827509.1599641268
export default Card;

{
  /* Bundle1: 
                      Website Development(Design + Mern Stack Development)
                      Website on Page Seo Content Writing + Lead Generation funnel consultation
                      Suggestion for Marketing Funnel Improvement

              Bundle2: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo 

              Bundle3: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo ,Lead Generation Funnel Implementation
                      1 Social Media Account set Up (Organic and Paid Advertising)

              Bundle4: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo (For 6 months) ,Lead Generation Funnel Implementation
                      2 Social Media Account set Up (Organic and Paid Advertising)
                      Email Marketing       */
}
