import App from "next/app";

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
    console.log(pageProps);
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
