import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import ServiceCards from "../../components/services/servicecards";

import { API } from "../../config";

const ServicesPage = () => {
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Individual Services
              </h1>
            </div>

            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                ComboPackages
              </h1>
              <div className="col-md-12  pt-9 ">
                <ServiceCards />
              </div>
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};


// export const getServerSideProps = async (context) => {
//   //now all the returns are avaialble as props

//   const data = await listServicesWith(skip, limit);

//   // console.log(data);

//   //console.log("getServerProps", data, context.params, context.query);

//   if (data.error) {
//     console.log(data.error);
//   } else {
//     return {
//       props: { ...data, blogLimit: limit, blogSkip: skip },
//     };
//   }
// };

export default ServicesPage;
