import React from "react";
import Link from "next/link";

const errorPage = () => (
  <div>
    <h1>OOPS!!! Something went wrong!! </h1>
    <p>
      Try
      <Link href="/">
        <a>Going Back </a>
      </Link>
    </p>
  </div>
);

export default errorPage;
