import React from "react";
import axios from "axios";

import Header from "../components/Header";

function ProfilePage({ setAuth, ...props }) {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const { name, email, password } = values;

    // Quick validation
    if (!name || !email || !password) return;

    // Send to backend
    axios
      .post(`/auth/register`, { name, email, password })
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
    transform: "translateY(+30%)",
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
        <div className="registerForm" style={loginStyle}>
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <form className="form-signup" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name-input">Name</label>
              <input
                type="text"
                className="form-control"
                id="name-input"
                aria-describedby="emailHelp"
                value={values.name}
                onChange={handleChange("name")}
                required
              />
            </div>
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
            </div>
            <p>
              Already have an accout? <a href="/login">Log in here</a>
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
