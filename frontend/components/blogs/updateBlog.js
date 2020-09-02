import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic"; //ReactQuill runs only on client side
//nextjs runs both on client and server side
//we need to make sure we are not using in server side rendering
import { withRouter } from "next/router";

//get the token , get xookie from local storage and send that when create the cat
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { singleBlog, updateBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { API } from "../../config";

const UpdateBlog = ({ router }) => {
  // const [title, setTitle] = useState();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //Tags

  const [body, setBody] = useState();
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    //make  the formdata availabk\le

    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    //grab the slug from router props

    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let catArray = [];
    blogCategories.map((cat, i) => {
      catArray.push(cat._id);
    });

    setChecked(catArray);
  };

  const setTagsArray = (blogTags) => {
    let tagArray = [];
    blogTags.map((tag, i) => {
      tagArray.push(tag._id);
    });

    setCheckedTag(tagArray);
  };

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

  const handleToggle = (cId) => () => {
    //clear the state incase of any error
    setValues({ ...values, error: "" });
    //return the first index or -1
    //state.indexOf(cid)
    const clickedCategory = checked.indexOf(cId); //index of is to find out if id is present already
    //this is the array which stores what all is there in the checked state
    const all = [...checked];

    //-1 means id dont exist
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }

    //update the state with the array
    //console.log(all);
    setChecked(all);

    //put the selecetd categories and push them to the categories state and send to backend
    formData.set("categories", all);
  };

  const handleTagsToggle = (tId) => () => {
    setValues({ ...values, error: "" });

    //return the first index or -1

    const clickedTag = checkedTag.indexOf(tId);
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

  const findOutCategories = (catId) => {
    const result = checked.indexOf(catId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTags = (tagId) => {
    const result = checkedTag.indexOf(tagId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return categories.map((cat, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={handleToggle(cat._id)}
          checked={findOutCategories(cat._id)}
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
          checked={findOutTags(tag._id)}
          type="checkbox"
          className="mr-2"
        />
        <label className="form-check-label">{tag.name}</label>
      </li>
    ));
  };

  const onChange = (name) => (e) => {
    //For title and image upload like featured
    //we grab the e.target.value to set the title
    //For images we get e.target.files
    //figure out what is the name to grab the concerned value to show up
    //console.log(e.target.value);
    //name can be title, photo or anything from forms
    //For images we upload many file but for featuerd image we grab the first image

    //if name is photo? :
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    //Before using this browswr api we need to instanciate it in in useeffcet
    //Here we are using a browswr api called formData
    //first is the property name then value or e.target....
    formData.set(name, value); //This is the data we will send to bacvkend

    //after populating we have to update the state
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onHandleChange = (e) => {
    //console.log(e);
    setBody(e); //pass whole event
    formData.set("body", e); //update the formData

    // //populate this body in local storage so that in refersh its not lost
    // if (typeof window !== "undefined") {
    //   //if we have a window then store the blog
    //   localStorage.setItem("blog", JSON.stringify(e));
    // }

    console.log("This is the updated formData", formData);
  };

  const editBlog = (e) => {
    // console.log("update blog");
    e.preventDefault();
    updateBlog(formData, getCookie("token"), router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled "${data.title}" is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          //Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user`);
        }
      }
    });
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

  const updateBlogForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => editBlog(e)}>
        <label className="text-muted">
          <h3>Title</h3>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title"
            value={title} // This value should be coming from the state
            onChange={onChange("title")} //setFormData
            required
          />
        </div>

        {/* This is the textArea */}
        <div className="form-group">
          <ReactQuill
            value={body || ""}
            placeholder="Write Somthing Amazing Here"
            modules={UpdateBlog.modules}
            formats={UpdateBlog.formats}
            onChange={(e) => onHandleChange(e)}
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Update" />
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid pb-5 ">
      <div className="row">
        <div className="col-md-10 pb-5">
          <p>create blog form </p>
          {/* {JSON.stringify(blog)} */}
          {updateBlogForm()}

          <div className="pb-5">
            {showError()}
            {showSuccess()}
          </div>

          {body && (
            <img
              src={`${API}/api/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: "100%" }}
            />
          )}

          {/* {JSON.stringify(categories)}
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

UpdateBlog.modules = {
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

UpdateBlog.formats = [
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

export default withRouter(UpdateBlog);
