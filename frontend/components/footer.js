import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Divider,
  Header,
  List,
  Input,
  Segment,
} from "semantic-ui-react";
const Footer = () => {
  const [subs, setSubs] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);
  const socialsharebutton = () => {
    <div>
      <Button circular color="facebook" icon="facebook" />
      <Button circular color="twitter" icon="twitter" />
      <Button circular color="linkedin" icon="linkedin" />
      <Button circular color="google plus" icon="google plus" />
    </div>;
  };

  const subsriptionHandler = () => {
    setLoading(true);
    console.log("I am subscribe");
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Divider horizontal>*********************</Divider>
      <Grid stackable divided="vertically">
        <Header as="h2">Know More </Header>
        <Grid.Row className="footer-design" columns={4}>
          <Grid.Column width={4}>
            <List>
              <List.Item icon="users" content="Semantic UI" />
              <List.Item icon="marker" content="New York, NY" />
              <List.Item
                icon="mail"
                content={
                  <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
                }
              />
              <List.Item
                icon="linkify"
                content={
                  <a href="http://www.semantic-ui.com">semantic-ui.com</a>
                }
              />
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List link>
              <List.Item active>Home</List.Item>
              <List.Item as="a">About</List.Item>
              <List.Item as="a">Services</List.Item>
              <List.Item as="a">Contact</List.Item>
              <List.Item as="a">Shop</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List link>
              <List.Item active>Services</List.Item>
              <List.Item as="a">Web Design And Development</List.Item>
              <List.Item as="a">Marketing</List.Item>
              <List.Item as="a">Consulation</List.Item>
              <List.Item as="a">Packages</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            {/* <Segment raised padded="very" compact> */}
            <Input
              type="email"
              placeholder="Subscribe"
              value={subs}
              onChange={(event) => setSubs(event.target.value)}
              action={
                success
                  ? {
                      color: "red",
                      content: "Item Added",
                      icon: "plus cart",
                      disabled: true,
                    }
                  : {
                      color: "orange",
                      content: "Subscribe",
                      icon: "plus cart",
                      loading,
                      disabled: loading,
                      onClick: subsriptionHandler,
                    }
              }
            />
            {/* </Segment> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <hr></hr>
      <hr></hr>
      <hr></hr>
    </React.Fragment>
  );
};

export default Footer;
