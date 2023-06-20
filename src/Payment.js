import React, { useState } from "react";
import styles from "./Payment.module.css";
import { useStateValue } from "./pages/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useEffect } from "react";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
        setClientSecret(response.data.clientSecret);
        // console.log('', user)
    };

    if (getBasketTotal(basket) * 100 > 1) getClientSecret();
  }, [basket]);
  console.log("the secret, clientSecret");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payement intent= payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };

  const handleChange = (event) => {
    //listen for changes in CardElement and display any error as the customer types their caard details.
    setDisabled(event.empty);
    setError(event.error ? event.error.massage : "");
  };

  return (
    <div className={styles.payment}>
      <div className={styles.paymentContainer}>
        <h1>
          Checkout (<Link to="/checkout"> {basket?.length}</Link>)
        </h1>
        <div className={styles.paymentSection}>
          <div className={styles.paymentTitle}>
            <h3>Delivery address</h3>
          </div>
          <div className={styles.paymentAddress}>
            <p> {user?.email}</p>
            <p>123 React lane</p>
            <p>123 React lane</p>
          </div>
        </div>
        <div className={styles.paymentSection}>
          <div className={styles.paymentTitle}>
            <h3>Review items and Delivery </h3>
          </div>
          <div className={styles.paymentItems}>
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
        </div>
      </div>
      <div className={styles.paymentSection}>
        <div className={styles.paymentTitle}>
          <h3>Payment method </h3>
        </div>
        <div className={styles.paymentDetails}>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className={styles.paymentPriceContainer}>
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3> Order Tool:{value}</h3>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />

              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
