import * as React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Button, Menu, Dropdown, Image } from "semantic-ui-react";

// import Home from "./Home";
// import About from "./About";

interface IProps {
  history: any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
  account?: types.Account;
}

class Navigation extends React.Component<IProps & ReduxProps> {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => {
      let str = this.state.activeItem === "home" ? "" : this.state.activeItem;
      this.props.history.push("/" + str);
    });
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <nav className={"deep-purple darken-1"}>
          <Menu pointing secondary position="right" size="massive">
            <Menu.Item
              name="home"
              active={this.state.activeItem === "home"}
              onClick={this.handleItemClick}
            />

            <Dropdown item text="Systems and Topics">
              <Dropdown.Menu>
                <Dropdown.Item name="systems" onClick={this.handleItemClick}>
                  Systems
                </Dropdown.Item>
                <Dropdown.Item name="topics" onClick={this.handleItemClick}>
                  Topics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Media">
              <Dropdown.Menu>
                <Dropdown.Item name="images" onClick={this.handleItemClick}>
                  Images
                </Dropdown.Item>
                <Dropdown.Item name="videos" onClick={this.handleItemClick}>
                  Videos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              name="quizzes"
              active={this.state.activeItem === "quizzes"}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name="classes"
              active={this.state.activeItem === "classes"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Button name="logout" primary onClick={this.handleItemClick}>
                  {"Log out, " + this.props.account.name}
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
      );
    } else {
      return (
        <nav className={"deep-purple darken-1"}>
          <Menu pointing secondary position="right" size="massive">
            <Menu.Item
              name="home"
              active={this.state.activeItem === "home"}
              onClick={this.handleItemClick}
            />

            <Menu.Menu position="right">
              <Menu.Item>
                <Button name="login" primary onClick={this.handleItemClick}>
                  {"Log in"}
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button name="signup" primary onClick={this.handleItemClick}>
                  {"Sign up"}
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
      );
    }
  }
}
const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn,
  account: state.Account
});

export default withRouter(
  connect<{}, {}, ReduxProps>(mapStateToProps)(Navigation)
);
