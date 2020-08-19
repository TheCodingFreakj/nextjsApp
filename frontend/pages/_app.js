import App from "next/app";

// const MyApp = ({ Component, pageProps }) => {
//   console.log(pageProps);
//   return (
//     <div className="overflow-hidden">
//       <Component {...pageProps} />
//     </div>
//   );
// };

class MyApp extends App {
  render() {
    const { Component } = this.props;
    console.log(this.props);

    return (
      <div className="overflow-hidden">
        <Component />;
      </div>
    );
  }
}

export default MyApp;
