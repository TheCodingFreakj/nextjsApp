import React, { useState, useEffect } from "react";
import {
  Card,
  Segment,
  Divider,
  Icon,
  Button,
  Header,
} from "semantic-ui-react";
import "../../static/styles.css";
import { listAllServices } from "../../actions/services";

import { API } from "../../config";

const ShowServices = ({ limit, skip }) => {
  // console.log(limit, "", skip);

  const [loadservices, setLoadServices] = useState([]);
  const [limitcount, setLimitCount] = useState(limit);
  const [skipNum, setSkipNum] = useState(skip);
  const [size, setSize] = useState();
  // console.log("The is loadedservices", loadservices);
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
        // console.log("The data got from backend", data);
        setLoadServices([...loadservices, ...data.servicesToBeSent]);
        setSize(data.size);
      }
    });
  };
  const showServices = (loadservices) => {
    return loadservices.map((serv) => ({
      header: serv.title,
      description: serv.summary,
      childKey: serv._id,
      image: `${API}/api/services/photo/${serv.slug}`,
      meta: `${serv.discountedServiceCharges[0].discountedServiceCharges} $ per ${serv.duration}`,
      href: `/services/${serv.slug}`,
      color: "red",
      extra: serv.ratingsAverage,
      //   content: pack.bundleDescription,
    }));
  };

  const handleLoadMore = async (e) => {
    // console.log("I am clicked");
    let toSkip = skipNum + limitcount;

    await listAllServices(limitcount, toSkip).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log("The data got from backend", data);
        setLoadServices([...loadservices, ...data.servicesToBeSent]);
        setSize(data.size);
        setSkipNum(toSkip);
      }
    });
  };

  return (
    <>
      <Header as="h1" block>
        Check Out Our Services
      </Header>

      <Card.Group
        stackable
        className="custom-card-style"
        itemsPerRow="3"
        centered
        items={showServices(loadservices)}
      />
      <Segment>
        {size > 0 && size >= limitcount && (
          <Button
            fluid
            color="green"
            content="Load More"
            icon="angle double down"
            labelPosition="left"
            onClick={() => handleLoadMore()}
          />
        )}
      </Segment>
    </>
  );
};

export default ShowServices;
