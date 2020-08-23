import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

//get the token , get xookie from local storage and send that when create the cat
import { isAuth, getCookie } from "../../actions/setAuthToken";

import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

//{JSON.stringify(router)}

const BlogComponent = ({ router }) => {
  //Here we will grab the blogContent from local storage and populating on the state

  const blogContentFromLS = () => {
    //dont have window avaliable
    if (typeof window === "undefined") {
      return false;
    }

    //if we have a item called blog in local storage and then we want that
    if (localStorage.getItem("blog")) {
      // we are storing the value as json object we need to convert that as js object which is showed ion the editor
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //Tags

  //run the function
  const [body, setBody] = useState(blogContentFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: "",
  });

  const {
    error,
    sizeError,
    success,
    formData,
    hidePublishButton,
    title,
  } = values;

  //instanciate new formData (broweser api) when the component loads and store that in the state under formData
  useEffect(() => {
    //fill the state with new values
    //we are fill on the text data to the instance of this formData using set() in respective handlers and then send to the backedn
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]); //anytime the router change this useeffect will run

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };
  //we will delete the blog content from the local storage only whwn we submit to backend and get the success response
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("Ready to Publish a Blog");

    createBlog(formData, getCookie("token")).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new Blog title:"${data.title}" is created `,
        });

        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const onChange = (name) => (e) => {
    //For title and image upload like featured
    //we grab the e.target.value to set the title
    //For u\images we get e.target.files
    //figure out what is the name to grab the concerned value to show up
    //console.log(e.target.value);

    //For images we upload many file but for featuerd image we grab the first image
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    //Here we are using a browswr api called formData
    formData.set(name, value); //This is the data we will send to bacvkend

    if (typeof window !== "undefined") {
      localStorage.setItem("title", JSON.stringify(value));
    }
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onHandleChange = (e) => {
    //console.log(e);
    setBody(e); //pass whole event
    formData.set("body", e);

    //populate this body in local storage so that in refersh its not lost
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = (cId) => () => {
    setValues({ ...values, error: "" });

    //return the first index or -1

    const clickedCategory = checked.indexOf(cId);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }

    console.log(all);
    setChecked(all);

    formData.set("categories", all);
  };

  const handleTagsToggle = (tId) => () => {
    setValues({ ...values, error: "" });

    //return the first index or -1

    const clickedTag = checked.indexOf(tId);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(tId);
    } else {
      all.splice(clickedTag, 1);
    }

    console.log(all);
    setCheckedTag(all);

    formData.set("tags", all);
  };

  const showCategories = () => {
    return categories.map((cat, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={handleToggle(cat._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{cat.name}</label>
      </li>
    ));
  };

  const showTags = () => {
    return tags.map((tag, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={handleTagsToggle(tag._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{tag.name}</label>
      </li>
    ));
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => onSubmit(e)}>
        <label className="text-muted">
          <h3>Title</h3>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title"
            value={title} // grab the init value from formData
            onChange={onChange("title")} //setFormData
            required
          />
        </div>

        <div className="form-group">
          <ReactQuill
            value={body}
            placeholder="Write Somthing Amazing Here"
            modules={BlogComponent.modules}
            formats={BlogComponent.formats}
            onChange={(e) => onHandleChange(e)}
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Publish" />
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid pb-5 ">
      <div className="row">
        <div className="col-md-10 pb-5">
          {createBlogForm()}

          <div className="pb-5">
            {showError()}
            {showSuccess()}
          </div>

          {/* <hr></hr>
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(body)}
          <hr />
          {JSON.stringify(categories)}
          <hr />
          {JSON.stringify(tags)} */}
        </div>
        <div className="col-md-2">
          <div>
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
          </div>
          <div>
            <h5>Categories</h5>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>

            <hr />
          </div>

          <div>
            <h5>Tags</h5>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogComponent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

BlogComponent.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(BlogComponent);
