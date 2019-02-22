import React, { Component } from "react";
import PropTypes from "prop-types";
//import logos from "../resources";

class Application extends Component {
  state = {
    showApplicationInfo: false
  };

  render() {
    if (this.props.application === null) {
      return <div />;
    }

    const {
      name,
      lastMacVersion,
      lastWindowsVersion,
      platform,
      url
    } = this.props.application;
    const { showApplicationInfo } = this.state;

    let platformInfo = [];

    if (platform === "Mac") {
      platformInfo = [<h5> Current Mac Version: {lastMacVersion}</h5>];
    } else if (platform === "Windows") {
      platformInfo = <h5> Current Windows Version: {lastWindowsVersion}</h5>;
    } else {
      platformInfo = [
        <h5> Current Mac Version: {lastMacVersion}</h5>,
        <h5> Current Windows Version: {lastWindowsVersion}</h5>
      ];
    }

    const image = require("../resources/" + name + ".png");

    return (
      <div class="card card-body">
        {showApplicationInfo ? (
          <h4 class="h-100">
            <img src={image} class="h-100 m-1 p-1" alt="None" />
            {name}{" "}
            <i
              onClick={() =>
                this.setState({
                  showApplicationInfo: !this.state.showApplicationInfo
                })
              }
              class="glyphicon glyphicon-menu-up float-right"
            />
          </h4>
        ) : (
          <h4 class="h-100">
            <img src={image} class="h-100 m-1 p-1" alt="None" />
            {name}{" "}
            <i
              onClick={() =>
                this.setState({
                  showApplicationInfo: !this.state.showApplicationInfo
                })
              }
              class="glyphicon glyphicon-menu-down float-right"
            />
          </h4>
        )}
        {showApplicationInfo ? (
          <ul class="list-group">
            <li class="list-group-item border-0">{platformInfo}</li>
            <li class="list-group-item border-0">
              Source: <a href={url}> {url} </a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Application.propTypes = {
  application: PropTypes.object.isRequired
};

export default Application;
