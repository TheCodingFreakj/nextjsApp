export const parseMyUrl = (urlParams) => {
  let dataUrl = urlParams.toString();
  let params = {};
  let vars = dataUrl.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return { params };
};

export const parsedataUrl = (urlParams) => {
  let dataUrl = urlParams.toString();

  let vars1 = dataUrl.split("?q=")[1];
  console.log(vars1);
  let params = {};
  let vars = vars1.split("&");
  let copyarray = [...vars];
  let subset = copyarray.splice(3, 8);
  params.general = Object.assign({}, copyarray);
  params.products = Object.assign({}, subset);
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

      let quant = p.quantity;
      let prodId = p._id;
      return { quant, productinfo, prodId };
    });

  return { productin };
};

export const servicedatatranform = (servicecart) => {
  servicecart.map((serv, i) => {
    return { serv };
  });
};

export const checkoutdataparser = (urlParams) => {
  let dataUrl = urlParams.toString();
  let vars1 = dataUrl.split("?q=")[1];
  let params = {};
  let vars = vars1.split("&");
  let copyarray = [...vars];
  let subsetdur = copyarray.slice(0, 4);
  let subsetmain = copyarray[copyarray.length - 1];
  let ar = subsetmain.split(",");
  let arr = ar[0].split("durationlists=");
  params.productioninfo = Object.assign({}, subsetdur);
  params.duration = Object.assign({}, arr);
  return { params };
};
