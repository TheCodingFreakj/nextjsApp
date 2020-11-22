import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesNTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

import Card from "../../components/blogs/card";
import { withRouter } from "next/router";

const Blogs = (pageProps) => {
  //console.log(pageProps); //nor coming
  //console.log(pageProps.router.pathname); //nor coming

  const routerParam = pageProps.router.pathname;
  const blogsLimit = pageProps.blogLimit;
  const blogsSkip = pageProps.blogSkip;
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

  //This handles if the user clicks loadMore

  const loadMore = () => {
    let toSkip = skip + limit;
    //This is used if they click on load more
    listBlogsWithCategoriesNTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //load the blogs as per request
        setLoadedBlogs([...loadedBlogs, ...data.blogsToBeSent]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-danger btn-lg">
          Load More
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return pageProps.blogsToBeSent.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  const showAllCategories = () => {
    return pageProps.categoriesToBeSent.map((cat, i) => (
      <Link key={i} href={`/categories/${cat.slug}`}>
        <a className="btn btn-success mr-1 ml-1 mt-3">{cat.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return pageProps.tagsToBeSent.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-success mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  You one place for marketing insights
                </h1>
              </div>

              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>

          <div className="container-fluid">{showAllBlogs()}</div>

          <div className="container-fluid">{showLoadedBlogs()}</div>

          <div className="text-center pt-5 pb-5"> {loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  //now all the returns are avaialble as props
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
