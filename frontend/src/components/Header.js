import React from "react";

const Header = () => {
  const headingStyle = {
    margin: "20px",
  };
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <span className="navbar-brand mb-0 h1 mx-3">
        <h1 className="h3 mb-3 font-weight-normal" style={headingStyle}>
          flash-cards
        </h1>
      </span>
    </nav>
  );
};

export default Header;
