import "./App.css";
import Header from "./pages/Header";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./Checkout";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./pages/StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51NKPkEFNVnqt4vpelspjVO92106FKEqDZ2zsO5tMQLrCAA2RwRcUzTB4gb8uQ8coXWQfxVDu7xEQm0OjSjKEsqkT00OhT5RTJa"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>", authUser);
      if (authUser) {
        // the user is logged in or was already logged in.

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Orders" element={<Orders />} />

          <Route
            path="/Checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
