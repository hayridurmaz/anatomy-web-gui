import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Form } from "semantic-ui-react";
import Axios from "axios";
import { SERVER_URL } from "src/utils/utils";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}
const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];
class Signup extends React.Component<IProps & ReduxProps> {
  state = {
    userName: "",
    password: "",
    email: "",
    gender: "",
    name: "",
    phoneNumber: "",
    signupCode: "",
    isTeacher: false,
    isSendClicked: false,
    signedUp: false
  };

  componentWillMount() {}

  handleChange = (e, { value }) =>
    this.setState({ isTeacher: value === "Teacher" });

  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDropdown = e => {
    this.setState({ gender: e.currentTarget.children[0].innerHTML });
  };

  onSendForm = () => {
    this.setState({ isSendClicked: true });
    if (
      this.state.userName === "" ||
      this.state.password === "" ||
      this.state.email === "" ||
      this.state.gender === "" ||
      this.state.name === "" ||
      this.state.phoneNumber === "" ||
      (this.state.signupCode === "" && this.state.isTeacher)
    ) {
      return;
    }

    if (this.state.signupCode !== "ANATOMYTOOL2019" && this.state.isTeacher) {
      window.alert("Sign Up Code is wrong!");
      return;
    }
    console.log(this.state);
    let account: types.Account = {
      name: this.state.name,
      userRole: this.state.isTeacher ? "Teacher" : "Student",
      gender: this.state.gender,
      mail: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      username: this.state.userName
    };

    console.log(JSON.stringify(account));
    if (window.confirm("Are you sure you want to sign up as " + account.name)) {
      Axios.post(SERVER_URL + "/Accounts", account)
        .then(response => {
          console.log(response);
          this.setState({ signedUp: true });
        })
        .catch(error => {
          window.alert(error.response.data.message);
        });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    if (this.state.signedUp) {
      return <Redirect to="/login" />;
    }
    return (
      <div className={"container signupContainer"}>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              error={
                this.state.isSendClicked && this.state.userName.length === 0
              }
              required
              onChange={this.onChangeText}
              name="userName"
              label="Username "
              placeholder="Username"
            />
            <Form.Input
              fluid
              error={
                this.state.isSendClicked && this.state.password.length === 0
              }
              required
              onChange={this.onChangeText}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              onChange={this.onChangeText}
              fluid
              error={this.state.isSendClicked && this.state.email.length === 0}
              required
              name="email"
              label="Email "
              placeholder="Email"
            />
            <Form.Input
              onChange={this.onChangeText}
              fluid
              error={this.state.isSendClicked && this.state.name.length === 0}
              required
              name="name"
              label="Name-Surname"
              placeholder="Name-Surname"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              error={
                this.state.isSendClicked && this.state.phoneNumber.length === 0
              }
              required
              onChange={this.onChangeText}
              name="phoneNumber"
              label="Phone Number"
              placeholder="+905XXXXXXXXXX"
            />
            {this.state.isTeacher && (
              <Form.Input
                fluid
                error={
                  this.state.isSendClicked &&
                  this.state.signupCode.length === 0 &&
                  this.state.isTeacher
                }
                required={this.state.isTeacher}
                onChange={this.onChangeText}
                name="signupCode"
                label="Signup Code"
                placeholder="Signup Code"
              />
            )}
            <Form.Select
              fluid
              error={this.state.isSendClicked && this.state.gender.length === 0}
              required
              onChange={this.onChangeDropdown}
              name="gender"
              label="Gender"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Sign up as:</label>
            <Form.Radio
              label="Teacher"
              value="Teacher"
              checked={this.state.isTeacher}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Student"
              value="Student"
              checked={!this.state.isTeacher}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Button onClick={this.onSendForm}>Submit</Form.Button>
        </Form>
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
)(Signup);
