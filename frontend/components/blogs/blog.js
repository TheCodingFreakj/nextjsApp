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
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

//{JSON.stringify(router)}

const BlogComponent = ({ router }) => {
  //we are storing the value in the local storage
  //and we want to reset or delete the values from local storage only if i get the success confirmation from backend
  const titletFromLS = () => {
    //dont have window avaliable
    if (typeof window === "undefined") {
      return false;
    }

    //if we have a item called blog in local storage and then we want that
    if (localStorage.getItem("title")) {
      // we are storing the value as json object we need to convert that as js object which is showed ion the editor
      return JSON.parse(localStorage.getItem("title"));
    } else {
      return false;
    }
  };

  //Here we will grab the blogContent from local storage and populating on the state
  //This function return the value of the property if it exists
  //You need to inc\voke the function in the state
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

  //whatever you want to show you have to get the exact data from backedn
  //or you can create create data which the user will give for instance forms
  //use functions for that

  //what ever you want ti show on screen you have to create the state
  //inside the functions you can setState of the data variable
  //Then you think how you can load the stuffs : useEffects
  //after loading the data in state you have to write another function to show the data

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //Tags

  //state for form values
  //run the function
  const [body, setBody] = useState(blogContentFromLS()); //after getting the data from
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: titletFromLS(), //The title by default will have a value by whatever is there in local storate
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

        setChecked([]);
        setCheckedTag([]);
        setCategories([]);
        setTags([]);
      }
    });
  };

  //This is a funxtion returi\ning another function

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

    //we have to  take this data from loacl storage and popuate it in the state as default value
    if (typeof window !== "undefined") {
      localStorage.setItem("title", JSON.stringify(value));
    }

    //after populating we have to update the state
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const onHandleChange = (e) => {
    //console.log(e);
    setBody(e); //pass whole event
    formData.set("body", e);

    //populate this body in local storage so that in refersh its not lost
    if (typeof window !== "undefined") {
      //if we have a window then store the blog
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  //function to get the ids

  //if id exists in the categories state we have to take that out using the splice method
  //if not we have to push the id to the state array
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
            value={title} // This value should be coming from the state
            onChange={onChange("title")} //setFormData
            required
          />
        </div>

        {/* This is the textArea */}
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

          <hr />
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(body)}
          <hr />
          {/* {JSON.stringify(categories)}
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

//While submitting somthing to the backend you have to use forms
//Store the submit type in a variable.
//Here we are also submitting checked bozes so we have to pick up the ids
//push the category ids in the state (update the state) then submit
