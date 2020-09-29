import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Card = ({ comboPackage }) => {
  console.log("This is comboPackage", comboPackage);

  const showCheckedPrice = () => {
    return comboPackage.checkedPrice.map((price, i) => (
      <article key={i}>
        discountedPackageCharges
        <hr />
      </article>
    ));
  };
  return (
    <React.Fragment>
      <div className="lead pb-4 ">
        <header>
          <Link href={`/blogs/${comboPackage.slug}`}>
            <a>
              <h2 className=" pt-3 pb-3 font-weight-bold">
                {comboPackage.title}
              </h2>
            </a>
          </Link>
        </header>

        <section>
          <p className="lead mark mt-3">
            <h5>{comboPackage.desc}</h5>
          </p>
        </section>

        <section>
          <p className="lead mark mt-3">
            <h5>{showCheckedPrice()}</h5>
          </p>
        </section>

        <section>
          <p className="lead mark mt-3">
            <h5>{comboPackage.bundleDescription}</h5>
          </p>
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
