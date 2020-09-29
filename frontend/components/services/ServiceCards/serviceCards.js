import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Card = ({ comboPackage }) => {
  console.log("This is comboPackage", comboPackage);

  // bundleDescription: "Digital Marketing Gold Packages ADesignTech Offers You Use your customers and network to your advantage. "
  // checkedPrice: ["5f6ddd7e60267a108ca80b8f"]
  // comboPackageName: "Gold Package"
  // createdAt: "2020-09-29T05:22:44.014Z"
  // desc: "Digital Marketing Gold Packages ADesignTech Offers You Use your customers and network to your advantage. "
  // title: "Gold Package"
  // updatedAt: "2020-09-29T05:22:44.014Z"
  // __v: 0
  // _id: "5f72c4a16910bb1074c8915d"

  // const { bundleDescription, checkedPrice, desc, title } = packageOptions;

  return (
    <React.Fragment>
      <div className="lead pb-4 ">
        {/* <button className="btn btn-success">
          {comboPackage.comboPackageName}
        </button>
        <header>
          title here
          <Link href={`/combo-packages/${comboPackage.slug}`}>
            <a>
              <h2 className=" pt-3 pb-3 font-weight-bold">
                {comboPackage.title}
              </h2>
            </a>
          </Link>
        </header>

        <section>
          <p>{comboPackage.desc}</p>
        </section> */}

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
          <p>{/* <h2> {showPackagePrice()}</h2> */}</p>
        </section>

        <section>
          <p>{/* {comboPackage.serviceDescription} */}</p>
        </section>
      </div>
    </React.Fragment>
  );
};

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
