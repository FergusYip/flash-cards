import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class InputField extends Component {
  state = {};
  render() {
    return (
      <div className="inputField">
        <input
          className="input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value, e)}
        />
      </div>
    );
  }
}

export default InputField;
