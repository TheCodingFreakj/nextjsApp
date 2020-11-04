import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Icon,
  Header,
} from "semantic-ui-react";

const CreateShoppingProducts = () => {
  //store all the control input value to the state
  const [product, setProduct] = useState({
    name: "",
    price: "",
    media: "",
    description: "",
  });

  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    //event is an object
    //from this event we need to know about two properties and it values
    //name and its value of the form fields
    //we get all these in event.target and you access name and value we can destructure the object
    console.log("handler");

    const { name, value, files } = event.target;
    //we will pass the values of the properties passed from this object
    //to the state through the properties we defined
    //usually, since this is an object, the datatype of the property of the object is string "name" by default
    //we have to tell react that this a variable and not a string , [name] this is computed property

    //setProduct({ [name]: value }); //with this we will create a new object as per the field and we are not adding the change to the same object as we declared
    //what we need is we need to update the same object so we need to keep the prevState
    //or we nee to provide our prev State to state update
    if (name === "media") {
      setProduct((prevState) => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
      //this updater function return an objext ({})
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(product);

    //clear all inputs
    // we do that by clearing the state to empty string
    //in order to control the input as per state, we need to use value prop for each fields
    setProduct({
      name: "",
      price: "",
      media: "",
      description: "",
    });

    setSuccess(true);
  };

  return (
    <React.Fragment>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>

      <Form success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success"
          content="Your Product is created"
        />

        <Form.Field>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="name"
              label="Name"
              placeholder="Name"
              value={product.name}
              onChange={handleChange} //this recieves data about change
            />

            <Form.Field
              control={Input}
              name="price"
              label="Price"
              placeholder="Price"
              min="10"
              step="1"
              type="number"
              value={product.price}
              onChange={handleChange}
            />

            <Form.Field
              control={Input}
              name="media"
              type="file"
              label="Media"
              accept="image/*"
              content="Select Image"
              onChange={handleChange}
            />
          </Form.Group>

          <Image src={mediaPreview} rounded centered size="small" />

          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange} //pass the reference of the function
          />

          <Form.Field
            control={Button}
            color="green"
            icon="pencil alternate"
            content="Submit"
            type="submit"
          />
        </Form.Field>
      </Form>
    </React.Fragment>
  );
};

export default CreateShoppingProducts;
