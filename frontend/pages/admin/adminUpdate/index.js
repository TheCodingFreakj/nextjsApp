import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Admin from "../../../components/admin";
import ProfileUpdate from "../../../components/profiles/updateProfile";

//bring components

const AdminUpdate = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminUpdate;
