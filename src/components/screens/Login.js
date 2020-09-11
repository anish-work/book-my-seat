import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("guest@guest.com");
  const [password, setPassword] = useState("guest123");
  const [logging, setLogging] = useState(false);

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function onsubmit(e) {
    e.preventDefault();
    setLogging(true);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem("userStatus", JSON.stringify(true));
      })
      .catch((error) => {
        const err = new Error("Cannot sign in with this email and password");
        alert(err);
        setLogging(false);
      });

    // setState({ email: "", password: "" });
  }

  return (
    <div className="col-md-5 mx-auto">
      <Link to="/">
        <i className="fa fa-arrow-left" /> Home
      </Link>

      <h3 className="text-center text-danger font-weight-bold mb-5">
        Login to Book{" "}
      </h3>
      <form onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
          <div id="emailHelp" className="form-text">
            For demo purpose email is guest@guest.com and password is guest123
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-danger btn-block">
          {!logging ? "Login" : "Logging in...."}
        </button>
      </form>
    </div>
  );
}
