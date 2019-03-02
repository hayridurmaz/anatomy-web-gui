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

class Login extends React.Component<IProps & ReduxProps> {
  state = {
    userName: "",
    password: "",
    correctUser: "admin",
    correctPass: "admin"
  };
  componentWillMount() {}
  loginControl = () => {
    //TODO: check admin webservice!
    if (
      this.state.password === this.state.correctPass &&
      this.state.userName === this.state.correctUser
    ) {
      this.props.updateLoggedIn(true);
    } else {
      alert("Kullanıcı adı veya yanlış");
    }
  };
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className={"container loginContainer"}>
        <div className="loginSubContainer">
          <h5> LOGIN </h5>
          <div>
            <p>Kullanıcı adı:</p>
            <input
              onChange={event => {
                this.setState({ userName: event.target.value });
              }}
            />
            <p>Şifre: </p>
            <input
              type="password"
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          <button style={{ marginTop: 20 }} onClick={this.loginControl}>
            LOGIN
          </button>
        </div>
      </div>
    );
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
)(Login);
