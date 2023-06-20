import React, { useEffect, useState } from 'react'
import styles from "./Orders.module.css"
import { db } from './firebase';
import { useStateValue } from './pages/StateProvider';
import Order from './Order';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    
 
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
        db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
            })))
            ))
        } else {
            setOrders([])
        }

    }, [])

  return (
      <div className={styles.orders}>
          <h1> Your Orders </h1>
          
          <div className={styles.order}>
              {orders?.map(order => (
                  <Order order={order} />
              ))}
          </div>
    </div>
  )
}

export default Orders
