import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

//get the token , get xookie from local storage and send that when create the cat
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { listAllBlogs, removeBlog } from "../../actions/blog";
import moment from "moment";

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const token = getCookie("token"); // need the token to update and delete the blog


  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    listAllBlogs(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccessDeleteMessage(data.message);
        loadBlogs(); 
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure to delete the blog? ");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth && isAuth().role === 0) {
      return (
        <Link href={`/user/blog/${blog.slug}`}>
          <a className="btn btn-small btn-success">User Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className=" btn btn-small btn-success">Admin Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {

      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Submitted By {blog.postedBy.name} | Written on
            {moment(blog.updatedAt).from()}
            <button
              className="btn btn-small btn-danger"
              onClick={() => deleteConfirm(blog.slug)}
            >
              Delete
            </button>
          </p>

          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {successDeleteMessage && (
            <div className="alert alert-warning">{successDeleteMessage}</div>
          )}
          {showAllBlogs()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadBlogs;
