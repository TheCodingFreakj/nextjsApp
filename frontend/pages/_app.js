import App from "next/app";

const MyApp = ({ Component, pageProps }) => {
  //console.log(pageProps); //This one coming for the blogs page
  return (
    <div className="overflow-hidden">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
