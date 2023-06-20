import React from "react";
import styles from "./Product.module.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();


    const addToBasket = () => {
        //dispatch action into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

  return (
    <div className={styles.product}>
      <div className={styles.productInfo}>
        <p>{title}</p>
        <p className={styles.productPrice}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={styles.productRating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p> 🌟 </p>
            ))}
        </div>
      </div>
      <img
        src={image}
        alt=""
      />
      <button onClick={addToBasket}> Add to basket</button>
    </div>
  );
}

export default Product;
