const ServiceTotal = (services) => {
  const stripeTotal = services
    ? services
        .map((service) => {
          let projectduration = Number(
            service.product[0].duration.match(/\d+/)[0]
          );
          let emiAmtduration = projectduration / 2;
          let price =
            service.product[0].discountedServiceCharges[0]
              .discountedServiceCharges;

          let quantity = service.quantity;
          return { quantity, projectduration, emiAmtduration, price };
        })
        .reduce((sum, element) => {
          sum =
            sum +
            ((element.price * element.quantity) / element.projectduration) *
              element.emiAmtduration;
          return sum;
        }, 0)
    : null;
  const servicetotal = Number(((stripeTotal * 100) / 100).toFixed(2));
  return { servicetotal };
};

export default ServiceTotal;
//https://thecodebarbarian.com/javascript-reduce-in-5-examples.html

//Logic//

//get the subscroption amount and the duration on cart page..
//create a subcription api and process the payment using checkout

//no calculation required for tools
//you can show sub total, subcroption amount for services and tool separately
//add the amount of subscription before checkout
