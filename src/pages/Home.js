import React from "react";
import styles from "./Home.module.css";
import Product from "./Product";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <img
          className={styles.homeImg}
          src="https://images.news18.com/ibnlive/uploads/2021/10/amazon-prime-16337567574x3.jpg"
          alt=""
        />
      </div>
      <div className={styles.homeRows}>
              <Product
                  id={12323452}
          title="The Lean startup"
          price={26.99}
          image="https://www.libertybooks.com/image/cache/catalog/01.zeeshan/9780670921607-640x996.jpg?q6"
          rating={5}
        />
              <Product
                  id={12323452}
          title="Apple Vision Pro: The key to understanding how virtual and augmented reality will play out in academia, and the future of Apple’s new $3,500 device (launching next year), is to think in 10-year increments."
          price={3500}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvy4yLKP-JqgYbNHRgAhmd4GSRXa3Zlyeg6w&usqp=CAU"
          rating={5}
        />
      </div>
      <div className={styles.homeRows}>
              <Product
                  id={12323452}
          title="The Lean startup"
          price={26.99}
          image="https://www.libertybooks.com/image/cache/catalog/01.zeeshan/9780670921607-640x996.jpg?q6"
          rating={3}
        />
              <Product
                  id={12323452}
          title="The Lean startup"
          price={26.99}
          image="https://www.libertybooks.com/image/cache/catalog/01.zeeshan/9780670921607-640x996.jpg?q6"
          rating={5}
        />

              <Product
                  id={12323452}
          title="The Lean startup"
          price={26.99}
          image="https://www.libertybooks.com/image/cache/catalog/01.zeeshan/9780670921607-640x996.jpg?q6"
          rating={1}
        />
      </div>
      <div className={styles.homeRows}>
              <Product
                  id={12323452}
          title="The Lean startup"
          price={26.99}
          image="https://www.libertybooks.com/image/cache/catalog/01.zeeshan/9780670921607-640x996.jpg?q6"
          rating={5}
        />
      </div>
    </div>
  );
}

export default Home;
