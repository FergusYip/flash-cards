import React, { Component } from "react";
import UserStore from "../stores/UserStore";
import "bootstrap/dist/css/bootstrap.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      // max lenght
      return;
    }
    this.setState({ [property]: val });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({ buttonDisabled: true });
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (error) {
      console.log(error);
      this.resetForm();
    }
  }

  render() {
    return (
      <div classNameName="loginForm ">
        <h2>Log In</h2>
        <form>
          <div className="form-group">
            <label for="email-input">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email-input"
              aria-describedby="emailHelp"
              value={this.state.username ? this.state.username : ""}
              onChange={(val) => this.setInputValue("username", val)}
            />
          </div>
          <div className="form-group">
            <label for="password-input">Password</label>
            <input
              type="password"
              className="form-control"
              id="password-input"
              value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doLogin()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
