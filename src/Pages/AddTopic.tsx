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
import SystemRow from "src/Components/SystemTopicRow";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddTopic extends React.Component<IProps & ReduxProps> {
  state = {
    title: "",
    topicsArray: [] as types.Topic[]
  };

  componentDidMount() {
    this.getTopics();
  }

  handleSubmit = () => {
    if (this.state.title === "") {
      alert("Please do not leave title empty");
      event.preventDefault();

      return;
    }
    if (window.confirm("Are you sure you want to add the topic?")) {
      Axios.post("http://188.166.49.57:8080/Topics", {
        name: this.state.title
      }).then(response => {
        this.getTopics();
      });
      this.setState({ title: "" });
    }
    event.preventDefault();
  };

  getTopics = () => {
    Axios.get("http://188.166.49.57:8080/Topics").then(response => {
      this.setState({ topicsArray: response.data });
    });
  };

  updateTopic = (item: types.Topic, newName: string) => {
    Axios.put("http://188.166.49.57:8080/Topics/" + item.id, {
      name: newName
    }).then(response => {
      this.getTopics();
    });
  };

  deleteTopic = (item: types.Topic) => {
    if (window.confirm("Are you sure you want to delete the Topic?")) {
      //TODO: Send to the webservice
      Axios.delete("http://188.166.49.57:8080/Topics/" + item.id).then(
        response => {
          this.getTopics();
        }
      );
    }
  };

  renderTopics = () => {
    return this.state.topicsArray.map((item, id) => {
      return (
        <SystemRow
          key={id}
          item={item}
          editItem={this.updateTopic}
          deleteItem={this.deleteTopic}
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
            placeholder={"Topic name"}
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
          <h1 className={"teal-text"}> Add new topic </h1>
          <div className={"card-pannel z-depth-5 teal"}>{this.form()}</div>
          <h1 className={"teal-text"}> Topics </h1>
          <Segment.Group>{this.renderTopics()}</Segment.Group>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddTopic);
