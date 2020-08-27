import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ blog }) => {
  //console.log(blog);

  const showBlogCategories = (blog) => {
    return blog.categories.map((cat, i) => (
      <Link key={i} href={`/categories/${cat.slug}`}>
        <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{cat.name}</a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    //console.log(blog);
    return blog.tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-danger mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };
  return (
    <div className="lead pb-4 ">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className=" pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>

      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written By {blog.postedBy.name} | Published
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}

        <hr></hr>
        {/* {JSON.stringify(blog.tags)} */}
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-success mt-2 pt-2">Read More</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
