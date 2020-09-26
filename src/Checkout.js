import React from "react";
import { useStateValue } from "./StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        {basket?.length == 0 ? (
          <div>
            <h2>You have no products to checkout</h2>
            <p>
              You have no items presently in your basket, click on add to basket
              button beside your desired product in the home page
            </p>
          </div>
        ) : (
          <div>
            <h1 className="checkout__title">Your Shopping Basket</h1>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
      {basket.length > 0 ? (
        <div className="checkout__right">
          <Subtotal />
        </div>
      ) : null}
    </div>
  );
}

export default Checkout;
