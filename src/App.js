import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    response: ""
  };
  request = () => {
    var http = new XMLHttpRequest();
    var url = "https://anatomy-web.herokuapp.com/";
    var params = "";
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "text/plain");

    http.onreadystatechange = () => {
      // console.log(http.readyState);
      console.log(http.status);

      if (http.readyState === 4 && http.status === 200) {
        // alert(http.responseText);
        this.setState({ response: http.responseText });
      }
    };
    http.send(params);
  };

  componentDidMount() {
    this.request();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.response}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
