const calculateProductTotal = (products) => {
  const total = products.toolcarts.reduce((accumulator, element) => {
    accumulator += element.product[0].clientPrice * element.quantity;
    return accumulator;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number(((total * 100) / 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default calculateProductTotal;
