import { NextPage, NextPageContext } from "next";
import React, { useState, PropsWithChildren, ComponentType } from "react";

/**
 * Removes never-used context values to reduce bloat. Context values may come from server but then
 * be used client-side because they are saved in initial props.
 */
function minifyContext(context) {
  return { ...context, req: undefined, res: undefined };
}

const withSoftReload = (Page) => {
  async function getInitialProps(ctx) {
    return {
      context: minifyContext(ctx),
      ...(await Page.getInitialProps(ctx)),
    };
  }
  const omitContextFromProps = ({ context, ...props }) => props;
  const NewPage = (props) => {
    // set inner page initial props to wrapper initial props minus context
    const [initialProps, setInitialProps] = useState(
      omitContextFromProps(props)
    );
    async function softReload() {
      setInitialProps({
        children: null,
        ...(await Page.getInitialProps(props.context)),
      });
    }
    return <Page {...{ ...initialProps, softReload }} />;
  };
  NewPage.getInitialProps = getInitialProps;
  NewPage.displayName = `withSoftReload(${Page.displayName})`;
  return NewPage;
};

export default withSoftReload;
