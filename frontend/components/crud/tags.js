import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

//get the token , get xookie from local storage and send that when create the cat
import { isAuth, getCookie } from "../../actions/setAuthToken";

import { create, getTags, removeSingleTag } from "../../actions/tags";

const Tags = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token"); // pass the name of cookie you want to get

  //get all the things you want to show in the state using useeffect and loop throught to show
  //you can use useEffect when you want to show something on UI and it runs everytime the component mounts
  useEffect(() => {
    loadTags();
  }, [reload]);

  //putting all the created categories in categories and displaying it through categories[]
  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete me? ");
    // const categories = categories.filter(cat => cat.id !== itemId);
    if (answer) {
      //console.log(slug);
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    removeSingleTag(slug, token).then((data) => {
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

  //loop through the category array and map to display all using jsx
  //use this function to show it while returning
  const showTags = () => {
    return tags.map((tag, i) => (
      <button
        onDoubleClick={() => deleteConfirm(tag.slug)} //passing the slug we want to delete
        value={tag.slug}
        title="Double Click To Delete"
        key={i}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {tag.name}
      </button>
    ));
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
          removed: false,
          reload: !reload,
        });
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is Created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag is there already</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is Removed</p>;
    }
  };

  const newTagForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Tags"
            onChange={onChange("name")}
            value={name}
            required
          />
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

      <div onMouseMove={mouseMoveHandler}>
        {showRemoved()}
        {showTags()}
      </div>
      {newTagForm()}
    </React.Fragment>
  );
};

export default Tags;
