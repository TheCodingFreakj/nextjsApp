const calculateServiceTotal = (services) => {
  const total = services.serviceCarts.reduce((accumulator, element) => {
    accumulator +=
      element.product[0].discountedServiceCharges[0].discountedServiceCharges *
      element.quantity;
    return accumulator;
  }, 0);
  const servicecartTotal = ((total * 100) / 100).toFixed(2);
  const servicestripeTotal = Number((total * 100).toFixed(2));
  return { servicecartTotal, servicestripeTotal };
};

export default calculateServiceTotal;
