import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesNTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import pages from "../../static/pages.css";

import { withRouter } from "next/router";

const Blogs = (pageProps) => {
  console.log(pageProps);
  const routerParam = pageProps.router.pathname;
  const blogsLimit = pageProps.blogLimit;
  const blogSkip = pageProps.blogSkip;
  const blogSize = pageProps.size;

  const head = () => (
    <Head>
      <title>Full Fledged Marketing Solutions | {APP_NAME} </title>
      <meta
        name="description"
        content="Deep Insights on marketing strategy, budgeting for small businesses and startups"
      />

      <link rel="canonical" href={`${DOMAIN}${routerParam}`} />
      <meta
        property="og:title"
        content={`Latest Insights for small business | ${APP_NAME}`}
      />

      <meta
        property="og:description"
        content="Deep Insights on marketing strategy, budgeting for small businesses and startups"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${routerParam}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/marketingsolutions.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/marketingsolutions.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(blogSize);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const showAllblogs = (blogs) => {
    return blogs.map((b) => {
      console.log(b);
      return (
        <div className="blog-container">
          <div className="blog-container">
            <div className="related_cats">{showrelatedcats(b.categories)}</div>
            <div className="card">
              <div className="card-front"></div>
              <div className="card-back">
                <div>Posted By {b.postedBy.username}</div>
                <div className="social-icons">
                  <a
                    className="#"
                    className="fa fa-facebook"
                    aria-hidden="true"
                  ></a>
                  <a className="#" class="fa fa-twitter" aria-hidden="true"></a>
                  <a
                    className="#"
                    className="fa fa-linkedin"
                    aria-hidden="true"
                  ></a>
                  <a
                    className="#"
                    className="fa fa-instagram"
                    aria-hidden="true"
                  ></a>
                </div>

                <h2 className="heading">
                  <Link href={`/blogs/${b.slug}`}>{b.title}</Link>
                </h2>
                <p className="excerpt">{b.excerpt}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const showrelatedcats = (cats) => {
    return cats.map((d) => {
      return (
        <Link href={`/blogs/categories/${d.slug}`}>
          <p>{d.slug}</p>
        </Link>
      );
    });
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="blog-wrapper">
          {showAllblogs(pageProps.blogsToBeSent)}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  let skip = 0;
  let limit = 2;
  const data = await listBlogsWithCategoriesNTags(skip, limit);
  if (data.error) {
    console.log(data.error);
  } else {
    return {
      props: { ...data, blogLimit: limit, blogSkip: skip },
    };
  }
};

export default withRouter(Blogs);
