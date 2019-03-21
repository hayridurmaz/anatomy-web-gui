import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { List, Icon, Button } from "semantic-ui-react";
import AddQuiz from "./AddQuiz";

interface Iprops {
  news: any;
  location: any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class ClassDetail extends React.Component<Iprops & ReduxProps> {


  renderQuizzes = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.quizzes.length === 0) {
      return <div><p>There is no quiz found</p></div>
    }
    else {
      return class_obj.quizzes.map((quiz: types.Quiz, index: number) => {
        return <List.Item as='div' key={index}>
          <List.Content>
            <List.Header> <Icon name='question circle' />{quiz.header}</List.Header>
          </List.Content>
        </List.Item>
      })
    }
  }

  addQuiz = () => {

  }


  renderTeachers = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.teachers.length === 0) {
      return <div><p>There is no teachers found</p></div>
    }
    else {
      return class_obj.teachers.map((teacher: types.Teacher, index: number) => {
        return <List.Item as='div' key={teacher.id}>
          <List.Content>
            <List.Header> <Icon name='user circle' />{teacher.username}</List.Header>
          </List.Content>
        </List.Item>
      })
    }
  }

  renderStudents = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.students.length === 0) {
      return <div><p>There is no students found</p></div>
    }
    else {
      return class_obj.students.map((student: types.Student, index: number) => {
        return <List.Item as='div' key={student.id}>
          <List.Content>
            <List.Header> <Icon name='user circle' />{student.username}</List.Header>
          </List.Content>
        </List.Item>
      })
    }
  }

  render() {
    let class_obj = this.props.location.state.classes as types.Class;

    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{class_obj.name}</h1>
          <h2>Quizzes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button basic className="ui button" onClick={(event) => { }} color='green' id="but" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} > <Icon name="add circle" ></Icon></Button></h2>
          <List>
            {this.renderQuizzes()}
          </List>
          <h2>Teachers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button basic className="ui button" onClick={(event) => { }} color='green' id="but" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} > <Icon name="add user" ></Icon></Button></h2>
          <List>
            {this.renderTeachers()}
          </List>
          <h2>Students&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button basic className="ui button" onClick={(event) => { }} color='green' id="but" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} > <Icon name="add user" ></Icon></Button></h2>
          <List>
            {this.renderStudents()}
          </List>
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
