import React from "react";
import "../../static/cart.css";
import { getCookie } from "../../actions/setAuthToken";
import axios from "axios";
import { API } from "../../config";
const ShowCartItems = ({
  products,
  handleRemoveServiceFromCart,
  handleRemoveToolFromCart,
}) => {
  console.log(products.services);
  // console.log(products.tools);
  const [serviceQuan, setserviceQuan] = React.useState(""); //you have to store trhe initial quantituy in trhis state

  const serviceId = products.services._id;
  const handleClick = async (e) => {
    console.log("quantity Selected!!");
    setserviceQuan({ serviceQuan: e.target.value });

    const token = getCookie("token");
    const url = `${API}/api/services-cart`;
    const payload = {
      params: { serviceId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.put(url, payload);
    console.log("this is response from backend", response);
    //semf
  };

  console.log(serviceQuan);
  const showserviceitems = (services) => {
    return services.map((s) => {
      return (
        <div key={s._id} className="cart_item_wrapper">
          <table>
            <tr>
              <th>Product Name</th>
              <th>Charges-1st emi</th>
              <th>Duration</th>
              <th>Quantity</th>
              <th>Quan Change</th>
              <th>Action</th>
            </tr>
            <tr>
              <td> {s.product[0].slug}</td>
              <td>
                {
                  s.product[0].discountedServiceCharges[0]
                    .discountedServiceCharges
                }
              </td>
              <td>{s.product[0].duration}</td>
              <td> {s.quantity} number of month</td>
              <td>
                <label for="quant">quantity</label>
                <select name="quant" className="input" onClick={handleClick}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </td>
              <td>
                <button className="btn">cancel</button>
              </td>
            </tr>
          </table>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <>
        {products.services ? (
          <div className="cart_item_wrapper-1">
            {showserviceitems(products.services.products)}
          </div>
        ) : (
          <p>No products</p>
        )}
      </>
    </React.Fragment>
  );
};

export default ShowCartItems;
