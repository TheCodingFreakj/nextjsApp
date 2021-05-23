import React, { useState } from "react";
import Link from "next/link";
import "../../static/styles.css";

const ShowComboPackages = ({ packages }) => {
  const showComboPackages = (packages) => {
    return packages.map((p) => {
      return (
        <div className="indv-card" key={p._id}>
          <h2>{p.comboPackageName}</h2>
          <p>{p.desc}</p>
          <p>{p.checkedPrice[0].discountedPackageCharges}</p>
          <Link href={`/package/${p.slug}`}>
            <a className=" btn btn-small btn-success">Subscribe</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <div className="combo_wrapper">{showComboPackages(packages)}</div>
    </>
  );
};

export default ShowComboPackages;
