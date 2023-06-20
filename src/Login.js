import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

      auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
          navigate('/');
      })
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={styles.loginPage}>
      <Link to="/">
        <img
          className={styles.img}
          src="https://i.pinimg.com/originals/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.png"
          alt=""
        />
      </Link>
      <div className={styles.loginContainer}>
        <h1>Sign-In</h1>
        <form>
          <h5> E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5> Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className={styles.loginSignIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to Amazon clone's term and conditions of Use
          and Sale. Please see our privacy notice our cookies notice and our
          interest basked ads notice.
        </p>
        <button onClick={register} className={styles.loginRegister}>
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
