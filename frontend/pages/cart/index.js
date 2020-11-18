// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button, Segment } from "semantic-ui-react";
// import Layout from "../../components/Layout";
// import CartItemList from "../../components/cart/cartitemlist";
// import CartSummary from "../../components/cart/cartsummary";
// import ServiceItemList from "../../components/cart/serviceitemlist";
// import ShowProducts from "../../components/cart/productlist";
// import { isAuth, getCookie } from "../../actions/setAuthToken";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { API } from "../../config";
// import withSoftReload from "../../components/hoc/cartreload";

// //bring components

// const Cart = ({ products, services, softReload }) => {
//   const [cartproducts, setCartProducts] = useState(products);
//   const [cartservices, setCartServices] = useState(services);

//   if (typeof window !== "undefined") {
//     const pageRefresh = () => {
//       //http://www.boduch.ca/2019/04/refreshing-nextjs-page-data.html
//     };
//     window.onload = pageRefresh;
//   }

//   const handleRemoveFromCart = async (productId) => {
//     const token = getCookie("token");
//     const url = `${API}/api/tools-cart`;
//     const payload = {
//       params: { productId },
//       headers: {
//         Authorization: ` Bearer ${token}`,
//       },
//     };
//     const response = await axios.delete(url, payload);
//     setCartProducts(response.data);
//   };

//   const handleRemoveFromServiceCart = async (serviceId) => {
//     const token = getCookie("token");
//     const url3 = `${API}/api/services-cart`;
//     const payload3 = {
//       params: { serviceId },
//       headers: {
//         Authorization: ` Bearer ${token}`,
//       },
//     };
//     const responses3 = await axios.delete(url3, payload3);
//     setCartServices(responses3.data);
//   };

//   {
//     JSON.stringify(cartservices);
//   }

//   return (
//     <Layout>
//       {isAuth() && (
//         <Segment>
//           <CartItemList
//             handleRemoveFromCart={handleRemoveFromCart}
//             products={cartproducts}
//           />
//           <ServiceItemList
//             handleRemoveFromServiceCart={handleRemoveFromServiceCart}
//             services={cartservices}
//           />

//           <CartSummary
//             services={cartservices}
//             products={cartproducts}
//             softReload={softReload}
//           />
//         </Segment>
//       )}

//       {cartservices === [] && cartproducts === [] && (
//         <Segment
//           secondary
//           color="yellow"
//           inverted
//           textAlign="center"
//           placeholder
//         >
//           <Header icon>
//             <Icon name="shopping basket" color="black" />
//             No Products In Your Cart Add Some
//           </Header>
//           <div>
//             {user ? (
//               <Button color="orange" onClick={() => router.push("/services")}>
//                 View Products
//               </Button>
//             ) : (
//               <Button
//                 color="green"
//                 onClick={() => router.push("/customerSignup")}
//               >
//                 Login To Add Products
//               </Button>
//             )}
//           </div>
//         </Segment>
//       )}
//     </Layout>
//   );
// };

// // with products in  cart page reload dont fetch cart
// // with no products in cart, hitting the cart route gives error
// Cart.getInitialProps = async (ctx) => {
//   const token = getCookie("token");

//   // console.log(products);
//   if (token || products) {
//     const url = `${API}/api/services-cart`;
//     const url2 = `${API}/api/tools-cart`;

//     const payload = {
//       headers: {
//         Authorization: ` Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(url, payload);
//     const response2 = await axios.get(url2, payload);

//     // const totalProducts = [...response.data, ...response2.data];
//     // console.log(totalProducts);
//     // let productLists = [];
//     // totalProducts.map((cartItem) => productLists.push(cartItem._id));

//     // if (typeof window !== "undefined") {
//     //   localStorage.setItem("fetchedCart", JSON.stringify(productLists));
//     // }

//     return { services: response.data, products: response2.data };
//   } else {
//     return {
//       products: [],
//       services: [],
//     };
//   }
// };

// export default withSoftReload(Cart);
// // Previous render            Next render
// // ------------------------------------------------------
// // 1. useState                   useState
// // 2. useState                   useState
// // 3. useContext                 useContext
// // 4. useContext                 useContext
// // 5. useRef                     useRef
// // 6. useLayoutEffect            useLayoutEffect
// // 7. useRef                     useRef
// // 8. useRef                     useRef
// // 9. useDebugValue              useDebugValue
// // 10. useState                  useState
// // 11. useCallback               useCallback
// // 12. useRef                    useRef
// // 13. useRef                    useRef
// // 14. useRef                    useRef
// // 15. useCallback               useCallback
// // 16. useCallback               useCallback
// // 17. useLayoutEffect           useLayoutEffect
// // 18. useLayoutEffect           useLayoutEffect
// // 19. useMemo                   useMemo
// // 20. undefined                 useContext
