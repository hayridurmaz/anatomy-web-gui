import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}

class Logout extends React.Component<IProps & ReduxProps> {
  state = {
    loggedOut: false
  };
  componentWillMount() {
    this.props.updateLoggedIn(false);
    this.setState({ loggedOut: true });
  }
  loginControl() {}
  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <p>Logging out</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedIn: (loggedIn: boolean) => {
    dispatch(actions.updateLoggedIn(loggedIn));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
