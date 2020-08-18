import React from "react";
//import Link from "next/link";
import Layout from "../../components/Layout";
import Admin from "../../components/private";

//bring components

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <h2>Admin DashBorad</h2>
        {/* <Link href="/authSignup">
        <a>signup</a>
      </Link>

      <Link href="/authSignin">
        <a>signin</a>
      </Link> */}
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
