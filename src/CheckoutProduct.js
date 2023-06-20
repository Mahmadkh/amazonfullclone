import React from 'react'
import styles from "./CheckoutProduct.module.css"
import { useStateValue } from './pages/StateProvider'

function CheckoutProduct({ id, image, title, price, rating, hideButton }) { 
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,

        })

    }
  return (
    <div className={styles.checkOutProduct}>
          <img className={styles.checkProductImg} src={image}  />
          <div className={styles.checkOutProductInfo}>
              <p className={styles.checkOutProductTitle}>{title}</p>
              <p className={styles.checkOutProductPrice}>
                  <small>&</small>
                  <strong>{price}</strong>
              </p>
              <div className={styles.checkOutProductRating}>
                  {Array(rating)
                      .fill()
                      .map((_, i) => (
                        <p>🌟</p>
                  ))}
              </div>
              {/* ! means not  && means then */}
              {!hideButton && (
                  <button onClick={removeFromBasket}>Remove from basket</button>
              )}
              
          </div>
    </div>
  )
}

export default CheckoutProduct
