import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Card = ({ comboPackage }) => {
  //onsole.log("This is comboPackage", comboPackage);

  const showCheckedPrice = () => {
    return comboPackage.checkedPrice.map((price, i) => (
      <p className="text-center" key={i}>
        {price.discountedPackageCharges}
      </p>
    ));
  };
  return (
    <React.Fragment>
      <div className=" bg-success text-white lead pb-4 ">
        <header>
          <Link href={`/blogs/${comboPackage.slug}`}>
            <a>
              <h2 className=" text-center bg-success text-dark pt-3 pb-3 font-weight-bold">
                {comboPackage.title}
              </h2>
            </a>
          </Link>
        </header>

        <section>
          <div className="bg-danger text-white pl-2 mt-1">
            {comboPackage.desc}
          </div>
        </section>

        <section>
          <div className="bg-success text-white lead mark mt-3">
            <h5 className="text-center">{showCheckedPrice()}</h5>
          </div>
        </section>

        <section>
          <div className=" bg-danger text-white lead mark pl-2 pr-2">
            <ul className="list-group">
              <li className="list-group-item list-group-item-success">
                {comboPackage.bundleDescription}
                <hr />
              </li>
            </ul>
          </div>
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

                      //If you are just starting, this is it for you

              Bundle2: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo 

                      //This package is perfect if you want next level website and organic marketing services

              Bundle3: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo ,Lead Generation Funnel Implementation
                      1 Social Media Account set Up (Organic and Paid Advertising)
                  //Lead generation and social media marketing included. Best if you want to go pro
              Bundle4: 
                      Website Development(Design + Mern Stack Development)
                      Website Content Writing + Blog Marketing (4 blogs per month)
                      Off Page Seo (For 6 months) ,Lead Generation Funnel Implementation
                      2 Social Media Account set Up (Organic and Paid Advertising)
                      Email Marketing       */
  //Complete business development package for you
}
