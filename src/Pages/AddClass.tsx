import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate, SERVER_URL } from "../utils/utils";
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
  Image,
  Loader
} from "semantic-ui-react";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  userAccount?: types.Account;
}
class AddClass extends React.Component<IProps & ReduxProps> {
  state = {
    classesArray: [] as types.Quiz[],
    title: "",
    loading: false
  };

  componentWillMount() {
    this.setState({ tarih: getDate() });
    //TODO: Get
    this.getClasses();
  }

  getClasses = () => {
    this.setState({ loading: true });
    Axios.get(SERVER_URL + "/Classes")
      .then(response => {
        return response.data;
      })
      .then((classes: types.Class[]) => {
        let topicsForDropdown: types.Class[] = [];
        classes.map((topic, id) => {
          var element = topic as types.Class;

          topicsForDropdown.push(element);
          console.log(topic);
        });
        //console.log(JSON.stringify(topicsForDropdown))
        this.setState({ classesArray: topicsForDropdown });
        this.setState({ loading: false });
      });
  };
  handleSubmit = () => {
    this.setState({ loading: true });
    Axios.post(SERVER_URL + "/Classes", {
      student_ids: [],
      teacher_ids: [this.props.userAccount.id],
      name: this.state.title
    }).then(response => {
      if (response.status === 200) {
        this.getClasses();
      } else {
        alert(response.statusText);
      }
      this.setState({ loading: false });
    });
  };
  renderClasses = () => {
    if (this.state.loading) {
      return <Loader active inline="centered" />;
    } else {
      return this.state.classesArray.map((item, id) => {
        return (
          <div key={id} style={{ border: "10px black" }}>
            <Link to={{ pathname: "/detailClasses", state: { classes: item } }}>
              <h3 className={"white-text"}>{item["name"]}</h3>
            </Link>
            <hr />
          </div>
        );
      });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
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
                placeholder={"Class name"}
                onChange={event => {
                  this.setState({ title: event.target.value });
                }}
              />
            </label>
          </div>
          <h1>Classes</h1>
          {this.renderClasses()}
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn,
  userAccount: state.Account
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddClass);
