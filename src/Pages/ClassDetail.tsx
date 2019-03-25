import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  List,
  Icon,
  Button,
  ListIcon,
  ListItem,
  Segment
} from "semantic-ui-react";
import AddQuiz from "./AddQuiz";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Checkbox } from "@material-ui/core";
import { SERVER_URL } from "src/utils/utils";
import Axios from "axios";
import { green } from "@material-ui/core/colors";

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
};

interface Iprops {
  news: any;
  location: any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class ClassDetail extends React.Component<Iprops & ReduxProps> {
  state = {
    dialogAddStudent: false,
    dialogAddTeacher: false,
    dialogAddQuiz: false,
    quizzesArray: [] as types.Quiz[],
    teacherUsername: "",
    studentUsername: "",
    quizName: "",
    checkedQuizzes: [] as boolean[]
  };

  handleClickOpenTeacher = () => {
    this.setState({ dialogAddTeacher: true });
  };

  handleCloseTeacher = () => {
    this.setState({ dialogAddTeacher: false });
  };

  handleClickOpenQuiz = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    let alreadyAddedQuizzes = class_obj.quizzes;

    Axios.get(SERVER_URL + "/Quizzes")
      .then(response => {
        return response.data;
      })
      .then((classes: types.Quiz[]) => {
        let quizzes: types.Quiz[] = [];
        let bools = [];
        classes.map((topic, id) => {
          var element = topic as types.Quiz;

          if (!alreadyAddedQuizzes.includes(element)) {
            quizzes.push(element);
            bools.push(false);
          }
        });
        //console.log(JSON.stringify(topicsForDropdown))
        this.setState({
          quizzesArray: quizzes,
          dialogAddQuiz: true,
          checkedQuizzes: bools
        });
      });
    //this.setState({ dialogAddQuiz: true });
  };

  handleCloseQuiz = () => {
    this.setState({ dialogAddQuiz: false });
  };

  handleClickOpenStudent = () => {
    this.setState({ dialogAddStudent: true });
  };

  handleCloseStudent = () => {
    this.setState({ dialogAddStudent: false });
  };
  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeChecked = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let isQuizzesChecked = this.state.checkedQuizzes;
    isQuizzesChecked[index] = event.target.checked;
    this.setState({
      checkedQuizzes: isQuizzesChecked
    });
  };

  renderQuizzes = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.quizzes.length === 0) {
      return (
        <div>
          <p>There is no quiz found</p>
        </div>
      );
    } else {
      return class_obj.quizzes.map((quiz: types.Quiz, index: number) => {
        return (
          <List.Item as="div" key={index}>
            <List.Content>
              <List.Header>
                {" "}
                <Icon name="question circle" />
                {quiz.header}
              </List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }
  };

  renderQuizDialog = () => {
    return (
      <Dialog
        open={this.state.dialogAddQuiz}
        onClose={this.handleCloseQuiz}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add quiz"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please choose a quiz name.
          </DialogContentText>
          <List>
            {this.state.quizzesArray.map((item, index) => {
              return (
                <List.Item as="div" key={index}>
                  <List.Content>
                    <List.Header>
                      <Icon name="question circle" />
                      {item.header}
                      <Checkbox
                        checked={this.state.checkedQuizzes[index]}
                        onChange={this.handleChangeChecked(index)}
                        value="checkedG"
                      />
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseQuiz} color="red">
            Cancel
          </Button>
          <Button onClick={this.handleCloseQuiz} color="green" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  addQuiz = () => {};

  renderTeachers = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.teachers.length === 0) {
      return (
        <div>
          <p>There is no teachers found</p>
        </div>
      );
    } else {
      return class_obj.teachers.map((teacher: types.Teacher, index: number) => {
        return (
          <List.Item as="div" key={teacher.id}>
            <List.Content>
              <List.Header>
                <Icon name="user circle" />
                {teacher.username}
              </List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }
  };

  renderStudents = () => {
    let class_obj = this.props.location.state.classes as types.Class;
    if (class_obj.students.length === 0) {
      return (
        <div>
          <p>There is no students found</p>
        </div>
      );
    } else {
      return class_obj.students.map((student: types.Student, index: number) => {
        return (
          <List.Item as="div" key={student.id}>
            <List.Content>
              <List.Header>
                {" "}
                <Icon name="user circle" />
                {student.username}
              </List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }
  };

  render() {
    let class_obj = this.props.location.state.classes as types.Class;

    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{class_obj.name}</h1>
          <h2>
            Quizzes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              basic
              className="ui button"
              onClick={event => {
                this.handleClickOpenQuiz();
              }}
              color="green"
              id="but"
              style={{
                margin: 0,
                marginLeft: 2,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: 11.5,
                width: 43
              }}
            >
              {" "}
              <Icon name="add circle" />
            </Button>
          </h2>
          <List>{this.renderQuizzes()}</List>

          {this.renderQuizDialog()}
          <h2>
            Teachers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              basic
              className="ui button"
              onClick={event => {
                this.handleClickOpenTeacher();
              }}
              color="green"
              id="but"
              style={{
                margin: 0,
                marginLeft: 2,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: 11.5,
                width: 43
              }}
            >
              {" "}
              <Icon name="add user" />
            </Button>
          </h2>
          <List>{this.renderTeachers()}</List>
          <Dialog
            open={this.state.dialogAddTeacher}
            onClose={this.handleCloseTeacher}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add teacher"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please enter a teacher username to add.
              </DialogContentText>
              <TextField
                onChange={this.handleChange("teacherUsername")}
                id="standard-with-placeholder"
                label="Username"
                placeholder=""
                className={"textField"}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseTeacher} color="red">
                Cancel
              </Button>
              <Button onClick={this.handleCloseTeacher} color="green" autoFocus>
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <h2>
            Students&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              basic
              className="ui button"
              onClick={event => {
                this.handleClickOpenStudent();
              }}
              color="green"
              id="but"
              style={{
                margin: 0,
                marginLeft: 2,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: 11.5,
                width: 43
              }}
            >
              {" "}
              <Icon name="add user" />
            </Button>
          </h2>
          <List>{this.renderStudents()}</List>
          <Dialog
            open={this.state.dialogAddStudent}
            onClose={this.handleCloseStudent}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add student"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please enter a student username to add.
              </DialogContentText>
              <TextField
                onChange={this.handleChange("studentUsername")}
                id="standard-with-placeholder"
                label="Username"
                placeholder=""
                className={"textField"}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseStudent} color="red">
                Cancel
              </Button>
              <Button onClick={this.handleCloseStudent} color="green" autoFocus>
                Add
              </Button>
            </DialogActions>
          </Dialog>
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
