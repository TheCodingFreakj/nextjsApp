import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewPorfolio } from "../../actions/services";

//bring components

const PortfolioForms = () => {
  const [portfolio, setPortfolios] = useState({
    name: "",
    technical_sheet: "",
    technologies: "",
    company: "",
    portfolioError: false,
    portfolioSuccess: false,
    portfolioLoading: false,
    portfolioReload: false,
  });

  const {
    name,
    technical_sheet,
    technologies,
    company,
    portfolioError,
    portfolioSuccess,
    portfolioLoading,
    portfolioReload,
  } = portfolio;

  useEffect(() => {
    //fill the state with new values
    //we are fill on the text data to the instance of this formData using set() in respective handlers and then send to the backedn
    setPortfolios({ ...portfolio });
  }, []); //anytime the router change this useeffect will run

  const token = getCookie("token");

  const onChange = (name) => (e) => {
    const value = e.target.value;
    console.log(value);
    setPortfolios({
      ...portfolio,
      [name]: value, //keping the target values in state
      portfolioError: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("This is onSubmit");
    const formData = {
      name,
      technical_sheet,
      technologies,
      company,
    };
    createNewPorfolio(formData, token).then((data) => {
      console.log("This is getting from backend", data);
      if (data.error) {
        setPortfolios({
          ...setPortfolios,
          portfolioSuccess: false,
          portfolioLoading: false,
          portfolioError: data.error,
        });
      } else {
        setPortfolios({
          ...setPortfolios,
          name: "",

          technical_sheet: "",
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
            name="name"
            value={name || ""}
            onChange={onChange("name")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Technical Sheet</h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="technical_sheet"
            value={technical_sheet || ""} // This value should be coming from the state
            onChange={onChange("technical_sheet")} //setFormData
            required
          />
        </div>

        <label className="text-muted">
          <h4>Technologies</h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="technologies"
            value={technologies || ""} // This value should be coming from the state
            onChange={onChange("technologies")} //setFormData
            required
          />
        </div>

        <label className="text-muted">
          <h4>Company</h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="company"
            value={company || ""} // This value should be coming from the state
            onChange={onChange("company")} //setFormData
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PortfolioForms);
