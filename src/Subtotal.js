import React from "react";
import styles from "./Subtotal.module.css";
import { CurrencyFormat } from "react-currency-format";
import { useStateValue } from "./pages/StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {

  const navigate = useNavigate();

  const [{ basket }, dispatch] = useStateValue();
  console.log(getBasketTotal(basket));
  return (
    <div className={styles.subtotal}>
      <p>
        Subtotal ({basket.length} items):{" "}
        <strong> {getBasketTotal(basket)}</strong>
      </p>
      {/* <CurrencyFormat
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
              /> */}
      <small className="styles.subtotalGifts">
        <input type="checkbox" />
        This order contains a gift.
      </small>
      <button onClick={e =>  navigate('payment') }> </button>
    </div>
  );
}

export default Subtotal;
