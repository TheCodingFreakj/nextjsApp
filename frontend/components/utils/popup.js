import React, { useState, useEffect } from "react";
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
import { getBusinessDetails } from "../../actions/user";
const Popup = ({ loggedinUser }) => {
  const [values, setValues] = useState({
    description: "",
    phone: "",
    location: "",
    region: "",
    city: "",
    pinCode: "",
  });

  const [displayAddressInputs, toggledisplayAddressInputs] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //send the data to backend

    setValues({
      description: "",
      phone: "",
      location: "",
      region: "",
      city: "",
      pinCode: "",
    });

    setSuccess(true);

    //get off the pop up windwo

    // getBusinessDetails(formData, token).then((data) => {
    //   console.log("This is getting from backend", data);

    //   if (data.error) {
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     setValues({
    //       ...values,
    //       location: "",
    //       description: "",
    //       region: "",
    //       city: "",
    //       formData: "",
    //       pinCode: "",
    //       phone: "",
    //       error: "false",
    //       success: `A new service :"${data.serviceName}" is created `,
    //     });
    //   }
    // });
  };

  const closeModal = (e) => {
    Router.push(`/`);
  };

  const showRegistrationForm = () => {
    return (
      <React.Fragment>
        <Header as="h3" block>
          <Icon name="address book" color="red" />
          We encourage You To Update This Form
        </Header>

        <Form success={success} onSubmit={handleSubmit}>
          <Form.Field>
            <Form.Field
              control={TextArea}
              name="description"
              label="description"
              type="textArea"
              placeholder="description"
              value={values.description || ""}
              onChange={handleChange}
            />

            <Form.Field
              control={Input}
              name="phone"
              label="phone"
              placeholder="phone"
              value={values.phone || ""}
              onChange={handleChange}
            />

            <Form.Field
              control={Button}
              color="green"
              icon="pencil alternate"
              content="Update Address"
              type="button"
              onClick={() => toggledisplayAddressInputs(!displayAddressInputs)}
            />
            {displayAddressInputs && (
              <>
                <Form.Field
                  control={Input}
                  name="location"
                  label="location"
                  placeholder="location"
                  value={values.location || ""}
                  onChange={handleChange}
                />
                <Form.Field
                  control={Input}
                  name="region"
                  label="region"
                  placeholder="region"
                  value={values.region || ""}
                  onChange={handleChange}
                />
                <Form.Field
                  control={Input}
                  name="city"
                  label="city"
                  placeholder="city"
                  value={values.city || ""}
                  onChange={handleChange}
                />

                <Form.Field
                  control={Input}
                  name="pinCode"
                  label="pinCode"
                  placeholder="pinCode"
                  value={values.pinCode || ""}
                  onChange={handleChange}
                />
              </>
            )}

            <Form.Field
              control={Button}
              color="green"
              icon="pencil alternate"
              content="Submit"
              type="submit"
            />

            {success && (
              <>
                <Message
                  success
                  icon="check"
                  header="Success"
                  content="We got it Thank You.. Please Shop If You may?"
                  size="small"
                />
                <Button icon labelPosition="right" onClick={closeModal}>
                  Continue Shopping
                  <Icon name="right arrow" />
                </Button>
              </>
            )}
          </Form.Field>
        </Form>
      </React.Fragment>
    );
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        {showRegistrationForm()}

        {loggedinUser ? <Button onClick={closePopup}>X</Button> : null}
      </div>
    </div>
  );
};

export default Popup;
