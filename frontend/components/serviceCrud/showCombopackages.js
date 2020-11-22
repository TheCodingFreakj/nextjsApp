import React, { useState } from "react";
import { Card, Icon, Button, Header } from "semantic-ui-react";
import "../../static/styles.css";

const ShowComboPackages = ({ packages }) => {
  const showComboPackages = (packages) => {
    return packages.map((pack) => ({
      header: pack.comboPackageName,
      description: pack.desc,
      childKey: pack._id,
      meta: `${pack.checkedPrice[0].discountedPackageCharges} $`,
      href: `/pack/${pack.slug}`,
      color: "red",
      className: "indv-card",
      extra: pack.bundleDescription,
      //   content: pack.bundleDescription,
    }));
  };

  return (
    <>
      <Header as="h1" block>
        Check Out Our ComboPackages
      </Header>

      <Card.Group
        stackable
        className="custom-card-style card-dark"
        itemsPerRow="4"
        centered
        items={showComboPackages(packages)}
      />
    </>
  );
};

export default ShowComboPackages;
