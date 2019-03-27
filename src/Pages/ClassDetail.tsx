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
    checkedQuizzes: [] as boolean[],
    class_obj: {} as types.Class
  };

  componentWillMount() {
    this.setState({
      class_obj: this.props.location.state.classes as types.Class
    });
  }

  componentWillReceiveProps(nextProps: Iprops) {
    this.setState({
      class_obj: nextProps.location.state.classes as types.Class
    });
  }

  handleClickOpenTeacher = () => {
    this.setState({ dialogAddTeacher: true });
  };

  handleCloseTeacher = () => {
    this.setState({ dialogAddTeacher: false });
  };

  handleClickOpenQuiz = () => {
    // let class_obj = this.props.location.state.classes as types.Class;
    let alreadyAddedQuizzes = this.state.class_obj.quizzes;
    this.setState({ dialogAddQuiz: true });
    Axios.get(SERVER_URL + "/Quizzes")
      .then(response => {
        return response.data;
      })
      .then((classes: types.Quiz[]) => {
        let quizzes: types.Quiz[] = [];
        let bools = [];
        let quizIds = [];
        let quizNames = [];
        alreadyAddedQuizzes.forEach(item => {
          quizIds.push(item.id);
        });
        alreadyAddedQuizzes.forEach(item => {
          quizNames.push(item.header);
        });
        classes.map((topic, id) => {
          var element = topic as types.Quiz;

          if (!quizIds.includes(element.id)) {
            quizzes.push(element);
            bools.push(false);
          }
        });
        //console.log(JSON.stringify(topicsForDropdown))
        if (this.state.quizName.length === 0) {
          this.setState({
            quizzesArray: quizzes,
            checkedQuizzes: bools
          });
        } else {
          let searchedArr = [];
          let searchedArrBools = [];
          quizzes.forEach(element => {
            if (element.header.includes(this.state.quizName)) {
              searchedArr.push(element);
              searchedArrBools.push(false);
            }
          });
          this.setState({
            quizzesArray: searchedArr,
            checkedQuizzes: searchedArrBools
          });
        }
      });
    //this.setState({ dialogAddQuiz: true });
  };

  handleAddQuiz = () => {
    // let class_obj = this.props.location.state.classes as types.Class;
    let arr = [];
    this.state.checkedQuizzes.forEach((element: boolean, index: number) => {
      if (element) {
        arr.push(this.state.quizzesArray[index].id);
      }
    });

    if (arr.length !== 0) {
      Axios.put(SERVER_URL + "/Classes/" + this.state.class_obj.id, {
        quiz_ids: arr
      }).then(Response => {
        console.log(Response);
        this.setState({ dialogAddQuiz: false, class_obj: Response.data });
      });
    }

    console.log(arr);
  };

  handleCancelQuiz = () => {
    this.setState({ dialogAddQuiz: false });
  };

  handleDeleteQuiz = (quiz: types.Quiz) => {
    Axios.put(SERVER_URL + "/Classes/" + this.state.class_obj.id, {
      remove_quiz_ids: [quiz.id]
    }).then(Response => {
      console.log(Response);
      this.setState({ class_obj: Response.data });
    });
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

    if (name === "quizName") {
      this.handleClickOpenQuiz();
    }
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
    //let class_obj = this.props.location.state.classes as types.Class;
    if (this.state.class_obj.quizzes.length === 0) {
      return (
        <div>
          <p>There is no quiz found</p>
        </div>
      );
    } else {
      return this.state.class_obj.quizzes.map(
        (quiz: types.Quiz, index: number) => {
          return (
            <List.Item as="div" key={index}>
              <List.Content>
                <List.Header>
                  <Icon
                    name="delete"
                    inverted
                    circular
                    link
                    onClick={() => {
                      this.handleDeleteQuiz(quiz);
                    }}
                  />{" "}
                  {quiz.header + "                 "}
                </List.Header>
              </List.Content>
            </List.Item>
          );
        }
      );
    }
  };

  renderQuizDialog = () => {
    return (
      <Dialog
        open={this.state.dialogAddQuiz}
        onClose={this.handleCancelQuiz}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add quiz"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              <React.Fragment>
                Please choose a quiz name.
                <TextField
                  onChange={this.handleChange("quizName")}
                  id="standard-with-placeholder"
                  label="Quiz name"
                  placeholder=""
                  className={"textField"}
                  margin="normal"
                />
              </React.Fragment>
            }
            {this.state.quizzesArray.length === 0 &&
              "Could not found any quizzes"}
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
          <Button onClick={this.handleCancelQuiz} color="red">
            Cancel
          </Button>
          <Button onClick={this.handleAddQuiz} color="green" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  addQuiz = () => {};

  renderTeachers = () => {
    // let class_obj = this.props.location.state.classes as types.Class;
    if (this.state.class_obj.teachers.length === 0) {
      return (
        <div>
          <p>There is no teachers found</p>
        </div>
      );
    } else {
      return this.state.class_obj.teachers.map(
        (teacher: types.Teacher, index: number) => {
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
        }
      );
    }
  };

  renderStudents = () => {
    // let class_obj = this.props.location.state.classes as types.Class;
    if (this.state.class_obj.students.length === 0) {
      return (
        <div>
          <p>There is no students found</p>
        </div>
      );
    } else {
      return this.state.class_obj.students.map(
        (student: types.Student, index: number) => {
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
        }
      );
    }
  };

  render() {
    // let class_obj = this.props.location.state.classes as types.Class;

    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{this.state.class_obj.name}</h1>
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
