import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getComboPackages } from "../../actions/comboPackage";
import ShowServices from "../../components/services/showservices";
import ShowComboPackages from "../../components/serviceCrud/showCombopackages";

const ServicesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loader, setLoader] = useState({
    limit: 3,
    skip: 0,
  });

  const { limit, skip } = loader;

  useEffect(() => {
    loadCombopackages();
  }, []);

  const loadCombopackages = async () => {
    await getComboPackages().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPackages(data);
      }
    });
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center pb-9 ">
                How Do We Prefer To Work
              </h1>
              <div className="col-md-12 pt-3">
                <p>
                  Website development aint about creating a non-living software.
                  It is about creating a stoppage for customers,users as per
                  what they value. At Marketing Solutions App, we adopt the
                  agile methodology for website development.
                </p>

                <Link href="/about-us">
                  <a className=" btn btn-small btn-success ">
                    Learn More About We Can Help You
                  </a>
                </Link>
              </div>
            </div>
          </header>

          <ShowComboPackages packages={packages} />
          <ShowServices limit={limit} skip={skip} />
        </div>
      </main>
    </Layout>
  );
};

export default ServicesPage;
