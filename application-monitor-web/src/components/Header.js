import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  const { title } = props;
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <h1 class="navbar-text text-white">{title}</h1>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
