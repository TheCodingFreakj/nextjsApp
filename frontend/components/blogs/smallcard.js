import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  //console.log(blog);

  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>

          <div>
            <p className="card-text">{renderHTML(blog.excerpt)}</p>
          </div>
        </section>
      </div>

      <div className="card-body">
        <div>
          Posted {moment(blog.updatedAt).fromNow()} by{" "}
          <Link href={`/`}>
            <a className="float-right">{blog.postedBy.name}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;