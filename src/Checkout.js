import React from "react";
import styles from "./Checkout.module.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./pages/StateProvider";

function Checkout() {

  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className={styles.checkOut}>
      <div className={styles.checkOutLeft}>
        <img
          className={styles.checkImg}
          src="https://cedcommerce.com/blog/wp-content/uploads/2023/02/holiday-returns-rise-by-57-from-2021-blog-banner.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className={styles.checkOutTitle}>Your Shopping Basket</h2>

          {basket.map(item => (
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
      <div className={styles.checkOutRight}>
<Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
