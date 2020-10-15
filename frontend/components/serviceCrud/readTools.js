import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { getAllTools, removeSingleTool } from "../../actions/tools";

const ReadTools = () => {
  const [tools, setTools] = useState([]);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const token = getCookie("token");
  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = () => {
    getAllTools().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setTools(data);
      }
    });
  };
  const deleteTool = (slug) => {
    removeSingleTool(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSuccessDeleteMessage(data.message);
        loadTools(); //once we delete we need to load blog with page refresh
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure to delete the blog? ");
    if (answer) {
      deleteTool(slug);
    }
  };

  const showUpdateButton = (tool) => {
    return (
      <Link href={`/admin/marketingTools/${tool.slug}`}>
        <a className=" btn btn-small btn-success">Admin Update</a>
      </Link>
    );
  };

  const showAllTools = () => {
    return tools.map((tool, i) => {
      //console.log(pack);

      return (
        <div key={i} className="pb-5">
          <h3>{tool.tool}</h3>
          <p className="mark">
            <button
              className="btn btn-small btn-danger"
              onClick={() => deleteConfirm(tool.slug)}
            >
              Delete
            </button>
          </p>

          {showUpdateButton(tool)}
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
          {showAllTools()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadTools;
