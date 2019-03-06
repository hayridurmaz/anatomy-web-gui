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
var ProgressBar = require("react-progressbar").default;

interface IProps {
  item: types.System | types.Topic;
  editItem: (item: types.System | types.Topic, newSystem: string) => {};
  deleteItem: (item: types.System | types.Topic) => {};
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class SystemRow extends React.Component<IProps & ReduxProps> {
  state = {
    editedStr: ""
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <Segment pilled="true">
          <List.Item>
            <List.Content>
              <List.Header>
                {this.props.item.name}
                <Input
                  style={{ marginLeft: 20 }}
                  icon={
                    <Icon
                      name="edit"
                      inverted
                      circular
                      link
                      onClick={() => {
                        if (this.state.editedStr != "") {
                          this.props.editItem(
                            this.props.item,
                            this.state.editedStr
                          );
                          this.setState({ editedStr: "" });
                        }
                      }}
                    />
                  }
                  placeholder={this.props.item.name}
                  onChange={event => {
                    this.setState({ editedStr: event.target.value });
                  }}
                />
                <Icon
                  name="delete"
                  inverted
                  circular
                  link
                  onClick={() => {
                    this.props.deleteItem(this.props.item);
                  }}
                />
              </List.Header>
              <List.Description />
            </List.Content>
          </List.Item>
        </Segment>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(SystemRow);
