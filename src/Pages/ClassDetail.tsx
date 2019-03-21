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



  renderTeachers = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    return class_obj.teachers.map((teacher: types.Teacher, index: number) => {
      return <div><p>{teacher.username}</p></div>
    })
  }
  render() {
    let class_obj = this.props.location.state.classes as types.Class;

    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{class_obj.name}</h1>
          <h2>Teachers</h2>
          {this.renderTeachers()}
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
