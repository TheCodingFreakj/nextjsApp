const parseMyUrl = (urlParams) => {
  let dataUrl = urlParams.toString();
  // console.log(dataUrl);

  let params = {};
  let vars = dataUrl.split("&");
  // console.log(vars);

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // console.log(pair);
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  // console.log(params);

  return { params };
};

export default parseMyUrl;
