import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ blog }) => {
  console.log(blog);
  const showBlogCategories = (blog) => {
    return blog.categories.map((cat, i) => {
      return (
        <Link
          href={{
            pathname: "/blog/[slug]",
            query: { slug: `${cat.slug}` },
          }}
        >
          <a>{cat.name}</a>
        </Link>
      );
    });
  };
  //https://linguinecode.com/post/complete-guide-to-navigation-with-next-js-links
  //https://nextjs.org/learn/basics/create-nextjs-app
  //https://blog.logrocket.com/dealing-with-links-in-next-js/
  const showBlogTags = (blog) => {
    return blog.tags.map((tag, i) => {
      <Link
        href={{
          pathname: "/blog/[slug]",
          query: { slug: `${tag.slug}` },
        }}
      >
        <a>{tag.name}</a>
      </Link>;
    });
  };
  return (
    <div className="lead pb-4 ">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>{blog.title}</a>
        </Link>
      </header>

      <section>
        <p className="lead mark mt-3">
          Written By
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username}</a>
          </Link>
          | Published
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
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
