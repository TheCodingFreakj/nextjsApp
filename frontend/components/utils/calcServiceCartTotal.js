const calculateServiceTotal = (services) => {
  // console.log(services);
  // console.log(services.serviceCarts);

  let selectedservices = services.serviceCarts;

  const stripeTotal = selectedservices
    .map((service) => {
      let projectduration = Number(service.product[0].duration.match(/\d+/)[0]);
      let emiAmtduration = projectduration / 2;
      let price =
        service.product[0].discountedServiceCharges[0].discountedServiceCharges;
      let quantity = service.quantity;
      return { quantity, projectduration, emiAmtduration, price };
    })
    .reduce((sum, element) => {
      // console.log("element", element);

      sum =
        sum +
        ((element.price * element.quantity) / element.projectduration) *
          element.emiAmtduration;
      // console.log("sum", sum);

      return sum;
    }, 0);

  // console.log(stripeTotal);

  const total = services.serviceCarts.reduce((accumulator, element) => {
    accumulator +=
      element.product[0].discountedServiceCharges[0].discountedServiceCharges *
      element.quantity;
    return accumulator;
  }, 0);
  const servicecartTotal = ((total * 100) / 100).toFixed(2);
  const servicestripeTotal = Number(((stripeTotal * 100) / 100).toFixed(2));
  return { servicecartTotal, servicestripeTotal };
};

export default calculateServiceTotal;
//https://thecodebarbarian.com/javascript-reduce-in-5-examples.html

//Logic//

//get the subscroption amount and the duration on cart page..
//create a subcription api and process the payment using checkout

//no calculation required for tools
//you can show sub total, subcroption amount for services and tool separately
//add the amount of subscription before checkout
