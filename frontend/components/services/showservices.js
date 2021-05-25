// This componenet holds the logic of service cards

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../../static/styles.css";
import { listAllServices } from "../../actions/services";

import { API } from "../../config";

const ShowServices = ({ limit, skip }) => {
  // console.log(limit, "", skip);

  const [loadservices, setLoadServices] = useState([]);
  const [limitcount, setLimitCount] = useState(limit);
  const [skipNum, setSkipNum] = useState(skip);
  const [size, setSize] = useState();

  //getting the list of all services in useeffect
  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      loadServices();
    }

    return () => {
      mounted.current = false;
    };
  }, []);


  const loadServices = async () => {
    await listAllServices(limit, skip).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadServices([...loadservices, ...data.servicesToBeSent]);
        setSize(data.size);
      }
    });
  };

  const showServices = (loadservices) => {
    return loadservices.map((l) => {
      return (
        <div key={l.slug} className="flex-container-service">
          <img src={`${API}/api/services/photo/${l.slug}`} />
          <h2>{l.title}</h2>
          <div className="body_content">
            <p>{l.summary}</p>
            <p>
              {l.discountedServiceCharges[0].discountedServiceCharges}$ per $
              {l.duration}
            </p>
            <p>{l.ratingsAverage}</p>
            <Link href={`/services/${l.slug}`}>
              <a className=" btn btn-small btn-success">Enroll</a>
            </Link>
          </div>
        </div>
      );
    });
  };


  const handleLoadMore = async (e) => {
    let toSkip = skipNum + limitcount;
    await listAllServices(limitcount, toSkip).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadServices([...loadservices, ...data.servicesToBeSent]);
        setSize(data.size);
        setSkipNum(toSkip);
      }
    });
  };

  return (
    <>
      <div className="services_wrapper">
        {showServices(loadservices)}
        {size > 0 && size >= limitcount && (
          <button
            type="button"
            className="load_more"
            onClick={() => handleLoadMore()}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default ShowServices;
