import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; 
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";



const BlogComponent = ({ router }) => {
  const titletFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("title")) {
      return JSON.parse(localStorage.getItem("title"));
    } else {
      return false;
    }
  };

  const blogContentFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //Tags
  const [body, setBody] = useState(blogContentFromLS()); //after getting the data from
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: titletFromLS(),
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    hidePublishButton,
    title,
  } = values;

 
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]); 

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
 
  const onSubmit = (e) => {
    e.preventDefault();

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

        setChecked([]);
        setCheckedTag([]);
        setCategories([]);
        setTags([]);
      }
    });
  };

  //This is a funxtion returi\ning another function

  const onChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value); 
    if (typeof window !== "undefined") {
      localStorage.setItem("title", JSON.stringify(value));
    }

    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onHandleChange = (e) => {
    setBody(e); 
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = (cId) => () => {
    setValues({ ...values, error: "" });
    const clickedCategory = checked.indexOf(cId); 
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
    formData.set("categories", all);
  };

  const handleTagsToggle = (tId) => () => {
    setValues({ ...values, error: "" });
    const clickedTag = checkedTag.indexOf(tId);
    const allTags = [...checkedTag];
    if (clickedTag === -1) {
      allTags.push(tId);
    } else {
      allTags.splice(clickedTag, 1);
    }
    setCheckedTag(allTags);

    formData.set("tags", allTags);
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
            value={title} 
            onChange={onChange("title")} 
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
          {JSON.stringify(formData)}
          <div className="pb-5">
            {showError()}
            {showSuccess()}
          </div>
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


