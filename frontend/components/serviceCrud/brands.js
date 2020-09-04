import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Brands = () => {
  const newBrandForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Brand Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert Tool"
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
  return <React.Fragment>{newBrandForm()}</React.Fragment>;
};

export default Brands;
