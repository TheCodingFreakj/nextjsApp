import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Private from "../../../components/private";
import ProfileUpdate from "../../../components/profiles/updateProfile";

//bring components

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
