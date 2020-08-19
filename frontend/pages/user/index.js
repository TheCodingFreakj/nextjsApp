import React from "react";
//import Link from "next/link";
import Layout from "../../components/Layout";
import Private from "../../components/private";

//bring components

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <h2>User DashBoard</h2>
        {/* <Link href="/authSignup">
        <a>signup</a>
      </Link>

      <Link href="/authSignin">
        <a>signin</a>
      </Link> */}
      </Private>
    </Layout>
  );
};

export default UserIndex;
