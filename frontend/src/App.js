import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./components/LoginForm";
import SubmitButton from "./components/SubmitButton.js";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIN", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (error) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  state = {};
  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading please wait...</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStore.username}
              <SubmitButton
                text={"Log out"}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }

      const style = {
        display: "flex",
        paddingTop: "40px",
        paddingBottom: "40px",
        // position: "absolute",
        top: "50%",
        transform: "translateY(+50%)",
      };
      return (
        <div className="app" style={{ position: "relative" }}>
          <div className="container" style={style}>
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
