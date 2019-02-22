import React, { Component } from "react";
import Application from "./Application";

class ApplicationList extends Component {
  state = {
    applications: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://application-monitor-v2.firebaseio.com/ApplicationList.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          applications: data,
          loading: false,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          applications: [],
          loading: false,
          error: error
        });
      });
  }

  render() {
    const { applications, loading, error } = this.state;

    if (!!error) {
      return (
        <div>
          <h4>
            There was an error retrieving the applications. Please try again.
          </h4>
        </div>
      );
    }

    if (loading) {
      return (
        <div>
          <h4> Loading... </h4>
        </div>
      );
    }

    if (applications.length <= 0) {
      return (
        <div>
          <h4> No applications were found in the database. </h4>
        </div>
      );
    }

    return (
      <div>
        <div align="right">{applications.length - 1} Applications</div>
        {applications.map(application => (
          <Application application={application} />
        ))}
      </div>
    );
  }
}

export default ApplicationList;
