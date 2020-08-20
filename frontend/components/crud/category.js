import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

//get the token , get xookie from local storage and send that when create the cat
import { isAuth, getCookie } from "../../actions/setAuthToken";

import {
  create,
  getCategories,
  removeSingleCategory,
} from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token"); // pass the name of cookie you want to get

  //you can use useEffect when you want to show something on UI and it runs everytime the component mounts
  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  //get all the things you want to show in the state using useeffect and loop throught to show

  const showCategories = () => {
    return categories.map((category, i) => (
      <button
        onDoubleClick={() => onDoubleClick(category.slug)}
        title="Double Click To Delete"
        key={i}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {category.name}
      </button>
    ));
  };

  const onDoubleClick = (slug) => {
    let answer = window.confirm("Are you sure you want to delete me? ");

    if (answer) {
      console.log(slug);
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeSingleCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, success: false });
      } else {
        console.log(data);
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };
  const onChange = (name) => (e) => {
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
    //console.log("Category", name);

    //whatever we type send this to backedn

    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Category"
            onChange={onChange("name")}
            value={name}
            required
          />
        </div>

        <button type="submit" className="btn btm-primary">
          Create
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div>{showCategories()}</div>
      {newCategoryForm()}
    </React.Fragment>
  );
};

export default Category;
