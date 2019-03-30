import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Axios from "axios";
import { SERVER_URL } from "src/utils/utils";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  userAccount?: types.Account;
}

class Home extends React.Component<IProps & ReduxProps> {
  render() {
    const style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    return (
      <div>
        <div style={style}>
          <div>
            <div className={"container "}>
              <h2 className={"teal-text"}>ANATOMY Admin!</h2>
              <p>
                Anatomy tool Admin sayfasına hoşgeldiniz,
                {this.props.userAccount &&
                  " " + this.props.userAccount.username}
              </p>
              <p>İletişim:</p>
              <p>Hayri DURMAZ</p>
              <p>hayri.durmaz@tedu.edu.tr</p>
              <hr />
              <p>Arda Tümay</p>
              <p>arda.tumay@tedu.edu.tr</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn,
  userAccount: state.Account
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
