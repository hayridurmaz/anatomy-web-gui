import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate, SERVER_URL } from "../utils/utils";
import Axios from "axios";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddClass extends React.Component<IProps & ReduxProps> {
  state = {
    classesArray: [] as types.Quiz[]
  };

  componentWillMount() {
    this.setState({ tarih: getDate() });
    //TODO: Get
    this.getClasses();
  }

  getClasses = () => {
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
      });
  };

  renderClasses = () => {
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
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
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
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddClass);
