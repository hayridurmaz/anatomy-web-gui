import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
import Axios from "axios";
import { Segment, Button, Form, Message } from "semantic-ui-react";
import { format } from "path";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddSystem extends React.Component<IProps & ReduxProps> {
  state = {
    title: "",
    systemsArray: [] as types.System[]
  };

  handleSubmit = event => {
    if (this.state.title === "") {
      alert("Please do not leave title empty");
      event.preventDefault();

      return;
    }
    if (window.confirm("Are you sure you want to add the system?")) {
      //TODO: Send to the webservice
      Axios.post("http://188.166.49.57:8080/Systems", {
        name: this.state.title
      }).then(response => {
        console.log(response.data);
        this.getSystems();
      });
      this.setState({ title: "" });
    }
    event.preventDefault();
  };

  getSystems = () => {
    Axios.get("http://188.166.49.57:8080/Systems").then(response => {
      this.setState({ systemsArray: response.data });
      console.log(response.data);
    });
  };
  componentDidMount() {
    this.getSystems();
  }

  renderSystems = () => {
    return this.state.systemsArray.map((item, id) => {
      return (
        <Segment key={id} pilled="true">
          {item.name}
        </Segment>
      );
    });
  };

  form = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ flex: 1, margin: 10 }}>
          <label>
            System name:
            <input
              value={this.state.title}
              style={{ marginLeft: 20, marginRight: 20 }}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
            <input type="submit" value="Submit" />
          </label>
        </div>
      </form>
    );
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"} style={{ flexDirection: "row", flex: 1 }}>
          <h1 className={"teal-text"}> Systems </h1>
          <Segment.Group>{this.renderSystems()}</Segment.Group>
          <h1 className={"teal-text"}> Add new system </h1>
          <div className={"card-pannel z-depth-5 teal"}>{this.form()}</div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddSystem);
