import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Form } from "semantic-ui-react";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}

class Signup extends React.Component<IProps & ReduxProps> {
  state = {
    userName: "",
    password: "",
    correctUser: "admin",
    correctPass: "admin",
    isTeacher: false
  };
  handleChange = (e, { value }) => this.setState({ value });
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
          <Form>
            <Form.Group widths="equal">
              <Form.Input fluid label="First name" placeholder="First name" />
              <Form.Input fluid label="Last name" placeholder="Last name" />
              {/* <Form.Select fluid label='Gender' options={options} placeholder='Gender' /> */}
            </Form.Group>
            <Form.Group inline>
              <label>Sign up as</label>
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
            <Form.TextArea
              label="About"
              placeholder="Tell us more about you..."
            />
            <Form.Checkbox label="I agree to the Terms and Conditions" />
            <Form.Button>Submit</Form.Button>
          </Form>
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
)(Signup);
