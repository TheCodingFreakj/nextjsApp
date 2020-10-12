import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { isAuth } from "../../actions/setAuthToken";

const BusinessDetailsForms = ({ router }) => {
  //getting all values from form inputs
  const [values, setValues] = useState({
    location: "",
    place: "",
    region: "",
    city: "",
    formData: "",
    pinCode: "",
    phone: "",

    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    reload: false,
  });
  {
    console.log(isAuth());
  }
  const {
    location,
    place,
    region,
    city,

    formData,
    pinCode,
    phone,
    error,
    loading,
    reload,
  } = values;

  //state to get the tools from backend
  const [loggedinUser, setLoggedinUser] = useState(["Pallavi"]);

  useEffect(() => {
    // const checkedData = new FormData();
    setValues({ ...values, formData: new FormData() });
    // showusers();
  }, [router]);

  const token = getCookie("token");

  //   const showusers = () => {
  //     getAllUsers().then((data) => {
  //       // console.log("This are all the tools I m getting from the backend", data);
  //       if (data.error) {
  //         setValues({ ...values, error: data.error });
  //       } else {
  //         setUsers(data);
  //       }
  //     });
  //   };

  //This is a function returning another function

  const onChange = (name) => (e) => {
    // console.log("The current input is", e.target.value);
    // console.log("The name is ", name);

    // const value = e.target.value;

    const value = name === "photo" ? e.target.files[0] : e.target.value;

    // console.log(value);

    formData.set(name, value);

    //after populating we have to update the state
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBusinessDetails(formData, token).then((data) => {
      console.log("This is getting from backend", data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          location: "",
          place: "",
          region: "",
          city: "",
          formData: "",
          pinCode: "",
          phone: "",
          error: "false",
          success: `A new service :"${data.serviceName}" is created `,
        });
      }
    });
  };

  const createBusinessDetailsForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h3>Country/Region </h3>
        </label>

        <div className="form-group">
          <select
            name="place"
            className="form-control"
            type="text"
            value={place}
            onChange={onChange("place")}
          >
            <option value="0">* Select Service Packages</option>
            <option value="contentMarketing">Content Marketing</option>
            <option value="seo">Seo</option>
            <option value="funnelMarketing">Funnel Marketing</option>
            <option value="StaticWebsites">Static Websites</option>
            <option value="singlePageWebsite">Single Page Website</option>
            <option value="ecommerceWebsites">Ecommerce Websites</option>
            <option value="Author Websites">Author Websites</option>
            <option value="resturantWebsites">Resturant Websites</option>
            <option value="corporateWebsites">Corporate Websites</option>
            <option value="personalBlogs">Personal Blogs</option>
            <option value="mobileApps">Mobile Apps</option>
          </select>
        </div>

        <label className="text-muted">
          <h3>Your Name </h3>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Input the Duration Here"
            value={loggedinUser}
            onChange={onChange("loggedinUser")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Street Number</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Duration Here"
            value={location}
            onChange={onChange("location")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>City</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            value={city}
            onChange={onChange("city")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>State/Province/Region</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            value={region}
            onChange={onChange("region")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Pin Code</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            value={pinCode}
            onChange={onChange("pinCode")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">
            <h3>Phone</h3>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input the Process Here"
            value={phone}
            onChange={onChange("phone")}
            required
          />
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-success"
            value="Add Address"
          />
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="row">
          <div className="col-md-8 pb-5">
            {createBusinessDetailsForm()}
            {/* {JSON.stringify(users)} */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

//This picks a logged in user

export default withRouter(BusinessDetailsForms);
