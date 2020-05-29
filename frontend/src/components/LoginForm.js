import axios from "axios";
import React, { Component } from "react";
import UserStore from "../stores/UserStore";
import "bootstrap/dist/css/bootstrap.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async submitHandler(event) {
    event.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) return;
    this.setState({ buttonDisabled: true });
    axios
      .post(`/auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        const data = response.data;
        // setAuth(data.token, data.u_id);
        // props.history.push("/");
      })
      .catch((err) => console.log(err));
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  render() {
    const style = {
      width: "100%",
      maxWidth: " 330px",
      padding: "15px",
      margin: "auto",
    };
    return (
      <div className="loginForm" style={style}>
        <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
        <form className="form-signin" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="email-input">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email-input"
              aria-describedby="emailHelp"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              className="form-control"
              id="password-input"
              onChange={this.handlePasswordChange}
            />
          </div>
          <p>
            Don't have an accout? <a href="#">Sign up here</a>
          </p>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
