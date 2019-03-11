import * as React from "react";
import { Link } from "react-router-dom";
import * as types from "../store/types";
import { connect } from "react-redux";
// import Home from "./Home";
// import About from "./About";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}

class Navigation extends React.Component<IProps & ReduxProps> {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <nav className={"deep-purple darken-1"}>
          <div className="header">
            <Link to={"/"}>
              <img src="https://www.tedu.edu.tr/sites/default/files/logo_tr_1.png" />
            </Link>
            <div className="header-right">
              <Link to={"/"}>
                <p className={"white-text"}>Homepage</p>
              </Link>
              <Link to={"/quizzes"}>
                <p className={"white-text"}>Add Quiz</p>
              </Link>
              <Link to={"/systems"}>
                <p className={"white-text"}>Systems</p>
              </Link>
              <Link to={"/topics"}>
                <p className={"white-text"}>Topics</p>
              </Link>
              <Link to={"/images"}>
                <p className={"white-text"}>Add Image</p>
              </Link>
              <Link to={"/videos"}>
                <p className={"white-text"}>Add Video</p>
              </Link>
              <Link to={"/logout"}>
                <p className={"white-text"}>Log Out</p>
              </Link>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className={"deep-purple darken-1"}>
          <div className="header">
            <Link to={"/"}>
              <img src="https://www.tedu.edu.tr/sites/default/files/logo_tr_1.png" />
            </Link>
            <div className="header-right">
              <Link to={"/"}>
                <p className={"white-text"}>Anasayfa</p>
              </Link>
              <Link to={"/login"}>
                <p className={"white-text"}>Giriş yap</p>
              </Link>
            </div>
          </div>
        </nav>
      );
    }
  }
}
const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(Navigation);
