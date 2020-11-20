import React, { useRef, useState, useEffect } from "react";
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
import { getCookie } from "../../actions/setAuthToken";

const Popup = ({ showPopUp, serviceSlug, ...props }) => {
  const [values, setValues] = useState({
    description: "",
    phone: "",
    location: "",
    region: "",
    city: "",
    pinCode: "",
    error: false,
  });

  const [displayAddressInputs, toggledisplayAddressInputs] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setshow] = useState(showPopUp);
  const [customer, setCustomer] = useState("");
  const mounted = useRef(false);
  const token = getCookie("token");

  useEffect(() => {
    mounted.current = true;
    const getCustomer = async () => {
      await getCurrentCustomer(token).then((data) => {
        //console.log(data);
        data.phone ? props.custData(data) : null;
      });
    };
    getCustomer();

    return () => {
      mounted.current = false;
    };
  }, [customer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  //handle on submit of the pop up
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = values;
    await getBusinessDetails(formData, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: true,
        });
      } else {
        setCustomer(data);
        setValues({
          description: "",
          phone: "",
          location: "",
          region: "",
          city: "",
          pinCode: "",
        });
        setSuccess(true);
      }
    });
  };

  const closeModal = (e) => {
    setshow(!show);
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
      <div className="popup_inner">{showRegistrationForm()}</div>
    </div>
  );
};

export default Popup;
