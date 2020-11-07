import React, { useState, useEffect } from "react";
import Router from "next/router";
import {
  Form,
  Input,
  TextArea,
  Button,
  Message,
  Icon,
  Header,
} from "semantic-ui-react";
import { getBusinessDetails, getCurrentCustomer } from "../../actions/user";
import {
  getCookie,
  isAuth,
  removeLocatStorage,
} from "../../actions/setAuthToken";
import { withRouter } from "next/router";

const Popup = ({ router, showPopUp, serviceSlug, loggedinUser, ...props }) => {
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
  const [show, setshow] = useState(showPopUp);
  const [customer, setCustomer] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    getCustomer();
  }, [router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = values;
    const customerdata = getBusinessDetails(formData, token);
    sendCustomer();
    setValues({
      description: "",
      phone: "",
      location: "",
      region: "",
      city: "",
      pinCode: "",
    });

    setSuccess(true);
  };

  const sendCustomer = () => {
    const customer = isAuth();
    localStorage.setItem("loggedincustomer", JSON.stringify(customer));
    setCustomer(JSON.parse(localStorage.getItem("loggedincustomer")));
  };

  const getCustomer = () => {
    const customer = getCurrentCustomer(isAuth().username, token).then(
      (data) => {
        data.phone ? props.custData(customer) : null;
      }
    );
  };

  const closeModal = (e) => {
    props.custData(customer);
    setshow(!show);
    removeLocatStorage("loggedincustomer");
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

export default withRouter(Popup);
