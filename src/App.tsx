import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

class App extends React.Component {
  state = {
    response: "GELMEDİ"
  };
  request = () => {
    var http = new XMLHttpRequest();
    var url = "http://188.166.49.57:8080/";
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
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          GELDİ Mİ: <code>{this.state.response}</code>
        </p>
      </div>
    );
  }
}

export default App;
