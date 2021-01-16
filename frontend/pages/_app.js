import App from "next/app";
import React from "react";

// const MyApp = ({ Component, pageProps }) => {

//   return (
//     <div className="overflow-hidden">
//       <Component {...pageProps} />
//     </div>
//   );
// };

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
