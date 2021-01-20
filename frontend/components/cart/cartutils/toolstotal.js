const Toolstotal = (products) => {
  const total = products.reduce((accumulator, element) => {
    accumulator += element.product[0].clientPrice * element.quantity;
    return accumulator;
  }, 0);
  // console.log(total);
  //const toolstotal = ((total * 100) / 100).toFixed(2);
  const toolstotal = Number(((total * 100) / 100).toFixed(2));
  return { toolstotal };
};

export default Toolstotal;
