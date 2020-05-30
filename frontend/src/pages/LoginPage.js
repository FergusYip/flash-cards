import React from "react";
import axios from "axios";

import Header from "../components/Header";

function LoginPage({ setAuth, ...props }) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = values;

    // Quick validation
    if (!email || !password) return;

    // Send to backend
    axios
      .post(`/auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        const data = response.data;
        setAuth(data.token, data.u_id);
        props.history.push("/");
      })
      .catch((err) => {});
  }

  const style = {
    display: "flex",
    paddingTop: "40px",
    paddingBottom: "40px",
    transform: "translateY(+45%)",
  };

  const loginStyle = {
    width: "100%",
    maxWidth: " 330px",
    padding: "15px",
    margin: "auto",
  };

  return (
    <div className="app" style={{ position: "relative" }}>
      <Header />
      <div className="container" style={style}>
        <div className="loginForm" style={loginStyle}>
          <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
          <form className="form-signin" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email-input">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email-input"
                aria-describedby="emailHelp"
                value={values.email}
                onChange={handleChange("email")}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password-input">Password</label>
              <input
                type="password"
                className="form-control"
                id="password-input"
                value={values.password}
                onChange={handleChange("password")}
                required
              />
              <div className="invalid-feedback">
                Please password of length greater than 8.
              </div>
            </div>
            <p>
              Don't have an accout? <a href="/register">Sign up here</a>
            </p>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
