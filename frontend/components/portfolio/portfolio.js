import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewPorfolio, getAllServices } from "../../actions/services";

//bring components

const PortfolioForms = ({ router }) => {
  const [portfolio, setPortfolios] = useState({
    name: "",
    technicalSheet: "",
    technologies: "",
    company: "",
    formData: "",
    portfolioError: false,
    portfolioSuccess: false,
    portfolioLoading: false,
    portfolioReload: false,
  });

  const {
    name,
    technicalSheet,
    technologies,
    company,
    formData,
    portfolioError,
    portfolioSuccess,
    portfolioLoading,
    portfolioReload,
  } = portfolio;

  const [services, setServices] = useState([]);
  const [checkedService, setCheckedService] = useState([]);

  useEffect(() => {
    setPortfolios({ ...portfolio, formData: new FormData() });
    showServiceSideBar();
  }, [router]);

  const token = getCookie("token");

  const showServiceSideBar = () => {
    getAllServices().then((data) => {
      // console.log("This are all the tools I m getting from the backend", data);
      if (data.error) {
        setPortfolios({ ...portfolio, portfolioError: data.error });
      } else {
        setServices(data);
      }
    });
  };

  const onChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    //const value = e.target.value;
    console.log(value);
    formData.append(name, value);
    setPortfolios({
      ...portfolio,
      [name]: value, //keping the target values in state
      formData: formData,
      portfolioError: "",
    });
  };

  const handleToggle = (sId) => {
    //clear the state incase of any error
    setPortfolios({ ...portfolio, portfolioError: "" });
    const clickedService = checkedService.indexOf(sId);

    //storing all the checked Values in allTools
    const allServices = [...checkedService];

    if (clickedService === -1) {
      allServices.push(sId);
    } else {
      allServices.splice(clickedService, 1);
    }
    // console.log("Storing all the check Items in a variable", allTools);
    setCheckedService(allServices); // storing all checked value in the state

    formData.append("services", allServices);
  };

  const showServices = () => {
    return services.map((services, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={() => handleToggle(services._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{services.title}</label>
      </li>
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    createNewPorfolio(formData, token).then((data) => {
      console.log("This is getting from backend", data);
      if (data.error) {
        setPortfolios({
          ...portfolio,
          portfolioSuccess: false,
          portfolioLoading: false,
          portfolioError: data.error,
        });
      } else {
        setPortfolios({
          ...portfolio,
          name: "",
          technicalSheet: "",
          technologies: "",
          company: "",
          portfolioSuccess: `A new service :"${data.name}" is created `,
          portfolioLoading: false,
          portfolioReload: true,
        });
      }
    });
  };
  const createPortfolioForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h4>Name</h4>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            value={name}
            onChange={onChange("name")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Technical Sheet</h4>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="technicalSheet"
            value={technicalSheet}
            onChange={onChange("technicalSheet")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Technologies</h4>
        </label>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="technologies"
            value={technologies}
            onChange={onChange("technologies")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Company</h4>
        </label>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="company"
            value={company}
            onChange={onChange("company")}
            required
          />
        </div>

        <div>
          <input type="submit" className="btn btn-success" value="Submit" />
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 pt-5 pb-5">{createPortfolioForm()}</div>
          <div className="col-md-2">
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <small className="text-muted">Max Size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload Featured Image
                <input
                  onChange={onChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
            <div>
              <h5>Select Services </h5>
              <ul style={{ maxHeight: "300px", overflowY: "scroll" }}>
                {showServices()}
              </ul>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PortfolioForms);
