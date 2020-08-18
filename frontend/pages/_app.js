import App from "next/app";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <div className="overflow-hidden">
        <Component />;
      </div>
    );
  }
}

export default MyApp;
