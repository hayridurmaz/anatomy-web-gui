import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";

interface Iprops {
  news: any;
  location: any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class ClassDetail extends React.Component<Iprops & ReduxProps> {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{this.props.location.state.news.header}</h1>
          <span style={{ whiteSpace: "pre-line" }}>
            {" "}
            {this.props.location.state.news.content}
          </span>
          <p>{this.props.location.state.news.author}</p>
          <p>{this.props.location.state.news.date}</p>
          <p>{this.props.location.state.news.type}</p>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(ClassDetail);
