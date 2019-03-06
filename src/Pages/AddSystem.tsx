import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
import Axios from "axios";
import {
  Segment,
  Button,
  Form,
  Message,
  Icon,
  Input,
  Item,
  List,
  Image
} from "semantic-ui-react";
import InlineEdit from "react-edit-inline";
import { format } from "path";
import { type } from "os";
import SystemRow from "src/Components/SystemRow";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddSystem extends React.Component<IProps & ReduxProps> {
  state = {
    title: "",
    currentEditedSystemName: "",
    currentEditSystem: {} as types.System,
    systemsArray: [] as types.System[]
  };

  componentDidMount() {
    this.getSystems();
  }

  handleSubmit = () => {
    if (this.state.title === "") {
      alert("Please do not leave title empty");
      event.preventDefault();

      return;
    }
    if (window.confirm("Are you sure you want to add the system?")) {
      Axios.post("http://188.166.49.57:8080/Systems", {
        name: this.state.title
      }).then(response => {
        this.getSystems();
      });
      this.setState({ title: "" });
    }
    event.preventDefault();
  };

  getSystems = () => {
    Axios.get("http://188.166.49.57:8080/Systems").then(response => {
      this.setState({ systemsArray: response.data });
    });
  };

  updateSystem = (item: types.System, newName: string) => {
    Axios.put("http://188.166.49.57:8080/Systems/" + item.id, {
      name: newName
    }).then(response => {
      this.getSystems();
    });
  };

  deleteSystem = (item: types.System) => {
    if (window.confirm("Are you sure you want to delete the system?")) {
      //TODO: Send to the webservice
      Axios.delete("http://188.166.49.57:8080/Systems/" + item.id).then(
        response => {
          this.getSystems();
        }
      );
    }
  };

  renderSystems = () => {
    return this.state.systemsArray.map((item, id) => {
      return (
        <SystemRow
          key={id}
          item={item}
          editItem={this.updateSystem}
          deleteItem={this.deleteSystem}
        />
      );
    });
  };

  form = () => {
    return (
      <div style={{ flex: 1, margin: 10 }}>
        <label>
          <Input
            style={{}}
            icon={
              <Icon
                name="add"
                inverted
                circular
                link
                onClick={() => {
                  this.handleSubmit();
                }}
              />
            }
            placeholder={"System name"}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
          />
        </label>
      </div>
    );
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"} style={{ flexDirection: "row", flex: 1 }}>
          <h1 className={"teal-text"}> Add new system </h1>
          <div className={"card-pannel z-depth-5 teal"}>{this.form()}</div>
          <h1 className={"teal-text"}> Systems </h1>
          <Segment.Group>{this.renderSystems()}</Segment.Group>
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
