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
  console.log(dataUrl);
  let vars1 = dataUrl.split("?q=")[1];
  console.log(vars1);

  let params = {};

  let vars = vars1.split("&");
  console.log(vars);

  let copyarray = [...vars];
  // console.log(copyarray);
  let subset = copyarray.splice(3, 8);
  // console.log(subset);
  //console.log("This is subset", subset);
  params.general = Object.assign({}, copyarray);
  params.products = Object.assign({}, subset);

  //console.log("This is params total generally", params.general);
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

export const servicedatatranform = (servicecart) => {
  // console.log("servicecart", servicecart);
  servicecart.map((serv, i) => {
    return { serv };
  });
};

export const checkoutdataparser = (urlParams) => {
  let dataUrl = urlParams.toString();
  //console.log(dataUrl);
  let vars1 = dataUrl.split("?q=")[1];
  //console.log(vars1);

  let params = {};

  let vars = vars1.split("&");
  //console.log(vars);

  let copyarray = [...vars];
  //console.log(copyarray);
  //Array.splice(position,num);

  //copyarray.map((el) => console.log(el));

  // let subsetmain = copyarray.splice(3, 1);
  let subsetdur = copyarray.slice(0, 4);
  let subsetmain = copyarray[copyarray.length - 1];
  //console.log("This is subsetdur", subsetdur);
  //console.log("This is subsetmain", subsetmain);
  let ar = subsetmain.split(", "); // split string on comma space
  //console.log(ar[0]);
  let arr = ar[0].split("durationlists=");

  //console.log(arr);
  params.productioninfo = Object.assign({}, subsetdur);
  params.duration = Object.assign({}, arr);

  //console.log("This is params total generally", params);
  return { params };
};
