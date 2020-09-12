import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import {
  createNewTool,
  getAllTools,
  getToolDetails,
  removeSingleTool,
} from "../../actions/tools";

const MarketingTools = () => {
  const [values, setValues] = useState({
    name: "",
    price: "",
    tool: "",
    summary: "",
    serviceCharges: "",
    toolArrayToShow: [],
    priceArrayToshow: [],
    error: false, //Shows up as a display message when there's any issues// turn it on only when you get issues in getting data from backend
    success: false, //Shows up as a display message when we submit somthing
    loading: false,
    removed: false,
    reload: false,
  });

  const {
    name,
    price,
    tool,
    summary,
    serviceCharges,
    success,
    error,
    loading,
    reload,
    toolArrayToShow,
    priceArrayToshow,
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTools(); //this funxtion sewnd a req to backend to get the tool details
  }, [reload]);

  const loadTools = () => {
    getAllTools().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        //store what you got in the state
        setValues({ ...values, toolArrayToShow: data });
      }
    });
  };

  const onChange = (name) => (e) => {
    // console.log("The current input is", e.target.value);
    // console.log([name]);
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("The Form Is Submitted");

    setValues({ ...values, loading: true, error: false });

    const newToolInfo = {
      tool,
      price,
      summary,
      serviceCharges,
    };

    //call the frontend action where you write frontend logic to create tools category

    createNewTool(newToolInfo, token).then((data) => {
      if (data.error) {
        //setvalues fill the error variable and turn off the success

        setValues({ ...values, error: data.error, success: false });
      } else {
        //turn all off and make the success true

        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: true,
        });
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete me? ");
    // const categories = categories.filter(cat => cat.id !== itemId);
    if (answer) {
      //console.log(slug);
      deleteTool(slug);
    }
  };

  const deleteTool = (slug) => {
    removeSingleTool(slug, token).then((data) => {
      // console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: true,
          reload: true,
        });
      }
    });
  };

  const showTools = () => {
    return toolArrayToShow.map((tool, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(tool.slug)} //passing the slug we want to delete
          value={tool.slug}
          title="Double Click To Delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {tool.tool}
        </button>
      );
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tool is Created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tool is there already</p>;
    }
  };

  const newToolForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Tool Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert Tool"
            value={tool}
            onChange={onChange("tool")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give Some Summary</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Give Some Summary"
            value={summary}
            onChange={onChange("summary")}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Price Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give the Price"
            value={price}
            onChange={onChange("price")}
            required
          />
        </div>
        <div
          className="form-group"
          value={serviceCharges}
          onChange={onChange("serviceCharges")}
        >
          <select name="status" className="form-control" type="text">
            <option value="0">* Select Service Charges</option>
            <option value="4.0">4.0</option>
            <option value="4.1">4.1</option>
            <option value="4.2">4.2</option>
            <option value="4.3">4.3</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };
  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}

      {/* <hr />
      {JSON.stringify(toolArrayToShow)}
      <hr />
      {JSON.stringify(priceArrayToshow)}
      <hr /> */}
      <div onMouseMove={mouseMoveHandler}>
        {newToolForm()}
        {showTools()}
      </div>
    </React.Fragment>
  );
};

export default MarketingTools;
