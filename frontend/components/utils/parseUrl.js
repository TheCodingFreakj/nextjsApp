export const parseMyUrl = (urlParams) => {
  let dataUrl = urlParams.toString();
  //console.log(dataUrl);

  let params = {};
  let vars = dataUrl.split("&");
  console.log(vars);

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    //console.log(pair);
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  // console.log(params);

  return { params };
};

export const parsedataUrl = (urlParams) => {
  let dataUrl = urlParams.toString();
  //console.log(dataUrl);
  let vars1 = dataUrl.split("?q=")[1];
  //console.log(vars1);

  let params = {};

  let vars = vars1.split("&");
  //console.log(vars);

  params = Object.assign({}, vars);

  return { params };
};

export const dataExtracter = (servicecart) => {
  const productin =
    servicecart &&
    servicecart.map((p) => {
      const productinfo = p.product.map((prod) => {
        let productinfo = {
          name: prod.slug,
          duration: prod.duration,
          discountrate: prod.discountedServiceCharges[0].servicedDiscountPrice,
        };

        return productinfo;
      });
      // console.log(productinfo);

      let quant = p.quantity;
      let prodId = p._id;
      return { quant, productinfo, prodId };
    });

  return { productin };
};
