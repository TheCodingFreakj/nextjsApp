import React, { useState, useEffect } from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import { listSearch } from "../../actions/blog";

const Search = () => {

  const [values, setValues] = useState({
    search: undefined, 
    results: [], 
    searched: false, 
    message: "",
  });

  const { search, results, searched, message } = values;
  const onSubmit = (e) => {
    e.preventDefault();


    listSearch({ search }).then((data) => {
  
      setValues({
        ...values,
        results: data, //data we get from backedn
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const onChange = (name) => (e) => {
  
    setValues({
      ...values,
      search: e.target.value,
      searched: false, 
      results: [],
    });

  };

  const searchBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-success">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
  const searchForm = () => (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Seach Blogs"
            value={search} // grab the init value from formData
            onChange={onChange("search")} //setFormData
            required
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-block btn-outline-success" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="mb-5 pt-3 pb-3">{searchForm()}</div>

      {searched && (
        <div style={{ marginTop: "-120px", marginBottom: "-80px" }}>
          {searchBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
