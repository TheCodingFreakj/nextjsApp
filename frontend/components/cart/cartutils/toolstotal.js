const Toolstotal = (products) => {
  const total = products
    ? products.reduce((accumulator, element) => {
        accumulator += element.product[0].clientPrice * element.quantity;
        return accumulator;
      }, 0)
    : null;

  const toolstotal = Number(((total * 100) / 100).toFixed(2));
  return { toolstotal };
};

export default Toolstotal;
