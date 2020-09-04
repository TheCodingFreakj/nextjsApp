import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const CreateServices = () => {
  const createServiceForm = () => {
    return <div>Form Here</div>;
  };
  return (
    <React.Fragment>
      <div className="container-fluid pb-5 ">
        <div className="row">
          <div className="col-md-10 pb-5">{createServiceForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateServices;

//https://draftjs.org/docs/quickstart-api-basics
//https://github.com/vercel/next.js/blob/canary/examples/with-draft-js/pages/index.js
//https://blog.learningdollars.com/2020/04/01/how-to-add-a-rich-text-editor-in-your-react-app-using-draft-js-and-react-draft-wysiwyg/
