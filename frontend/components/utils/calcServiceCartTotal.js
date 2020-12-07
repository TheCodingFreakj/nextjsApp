const calculateServiceTotal = (services) => {
  console.log(services);
  console.log(services.serviceCarts);

  let selectedservices = services.serviceCarts;

  const stripeTotal = selectedservices
    .map((service) => {
      let duration = service.product[0].duration;
      let price =
        service.product[0].discountedServiceCharges[0].discountedServiceCharges;
      let quantity = service.quantity;
      return { quantity, duration, price };
    })
    .reduce((accumulator, element) => {
      console.log("accumulator amount", accumulator);
      let el3dur = (
        (element.price * element.quantity) /
        Number(element.duration.match(/\d+/)[0])
      ).toFixed(2);
      console.log("subcroption amount for each service selected", el3dur);

      accumulator +=
        (element.price * element.quantity) /
        (
          (element.price * element.quantity) /
          Number(element.duration.match(/\d+/)[0])
        ).toFixed(2);

      return accumulator;
    }, 0);

  // console.log(stripeTotal);

  const total = services.serviceCarts.reduce((accumulator, element) => {
    accumulator +=
      element.product[0].discountedServiceCharges[0].discountedServiceCharges *
      element.quantity;
    return accumulator;
  }, 0);
  const servicecartTotal = ((total * 100) / 100).toFixed(2);
  const servicestripeTotal = Number(((total * 100) / 100).toFixed(2));
  // console.log(servicestripeTotal);
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
