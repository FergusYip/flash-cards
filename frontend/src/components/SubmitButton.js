import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class SubmitButton extends Component {
  state = {};
  render() {
    return (
      <div className="submitButton">
        <button
          className="btn"
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SubmitButton;
