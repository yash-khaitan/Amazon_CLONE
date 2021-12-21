import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total amount in a currencie's Subunits
        url: `/payments/create?total=${
          basket?.reduce((total, item) => {
            return total + item?.price;
          }, 0) * 100
        }`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    history.replace("/orders");
    // do some fancy stripe shitttttttttttttttt...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //patmentIntent = payment confirmation

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type:"EMPTY_BASKET",
        });
        history.replace("/orders");
      }).catch((error) => console.log(error) );
  };

  const handleChange = (event) => {
    //Listen for changes in the CardElement and display any errors as the customer type anyerrors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    // console.log(event);
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Container(<Link to="/checkout">{basket?.length} items</Link> )
        </h1>
        <div className="payment__section">
          {/* Payment section ----> Delivery address */}
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Fran de road</p>
            <p>Furaa de floor</p>
          </div>
        </div>
        <div className="payment__section">
          {/* Payment section ----> Review Item */}
          <div className="payment__title">
            <h3>Basket Items</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item, i) => {
              return (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
        <div className="payment__section">
          {/* Payment section ----> Payment method */}
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__detail">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={basket?.reduce((total, item) => {
                    return total + item?.price;
                  }, 0)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
              {/* ...ERROR... */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
