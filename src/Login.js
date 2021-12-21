import React, { useState } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    //fancy firebase login shittttt...

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error));
  };

  const register = (e) => {
    e.preventDefault();

    // fancy firebase register login shittt...
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="Login">
      <img
        className="Login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt=""
      />

      <div className="Login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="Login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </form>

        <button className="Login__registerButton" onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
