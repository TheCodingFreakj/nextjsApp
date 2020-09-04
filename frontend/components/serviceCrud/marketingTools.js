import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const MarketingTools = () => {
  const newToolForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Tool Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert Tool"
            // onChange={onChange("name")}
            // value={name}
            // required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Price Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give the Price"
            // onChange={onChange("name")}
            // value={name}
            // required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  };
  return <React.Fragment>{newToolForm()}</React.Fragment>;
};

export default MarketingTools;
