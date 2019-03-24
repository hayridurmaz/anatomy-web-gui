import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Questions from "../Components/Questions";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { Input, Dropdown, Button, Label, Grid, Segment, Image } from 'semantic-ui-react'
import Axios from "axios";
import QuestionInput from "../Components/QuestionInput";
import { bool } from "prop-types";


interface IProps { }
interface ReduxProps {
  isLoggedIn?: boolean;
}

//188.166.49.57
//localhost
var SERVER_URL = "http://localhost:8080"

class AddQuiz extends React.Component<IProps & ReduxProps> {
  state = {
    survey: {},
    news: "",
    isSent: false,
    surveyArray: [],

    chosenSystem: -1 as number,
    systemOptions: [],
    topicOptions: [],
    media: [] as types.Media[],
    QuestionCount: 0,
    title: "",

    questions: [] as types.Question[],
  };
  i = 0
  questionElements = [];

  handleSubmit = event => {

    let quiz = this.setQuiz()
    if(!this.sendForm()){
      console.log("not sent")
    }else
    if (window.confirm("Are you sure you want to add the quiz?")) {
      Axios.post("http://localhost:8080/Quizzes", {
        quiz_type_id: quiz.quiz_type_id,
        system_id: quiz.system_id,
        header: quiz.header,
      }).then((quizResponse: any) => {
        quiz.questions.forEach((question) => {
          Axios.post("http://localhost:8080/Questions", {
            media_id: question.media_id,
            topic_id: question.topic_id,
            quiz_id: quizResponse.data.id,
            qtext: question.qtext,
            hint: question.hint,
          }).then((questionResponse: any) => {
            console.log(questionResponse)
            question.answers.forEach((answer) => {
              Axios.post("http://localhost:8080/Answers", {
                question_id: questionResponse.data.id,
                atext: answer.atext
              }).then((answerResponseAns: any) => {
                if (answer.correct) {
                  Axios.post("http://localhost:8080/CorrectAnswers", {
                    question_id: questionResponse.data.id,
                    answer_id: answerResponseAns.data.id
                  }).then(response => {

                  });
                }
              });
            })

          });
        })


      });
      //this.setState({ title: "", });
    }
    event.preventDefault();
  };

  componentWillMount() {
    //TODO: Get current quizzes
    for (let index = 0; index < this.state.QuestionCount; index++) {
      let el = <p>sorular</p>;
      this.questionElements.push(el);
    }
    this.getDataFromServer()
  }

  getDataFromServer = () => {
    interface DropdownInterface {
      key: string,
      value: number,
      text: string
    }
    // stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
    Axios.get(SERVER_URL + '/Topics')
      .then((response) => { return response.data }).then((topics: types.Topic[]) => {
        let topicsForDropdown: DropdownInterface[] = []
        topics.map((topic, id) => {
          var element = {} as DropdownInterface
          element.key = String(topic.id)
          element.value = topic.id
          element.text = topic.name
          topicsForDropdown.push(element)
          //console.log(topic)
        })
        //console.log(JSON.stringify(topicsForDropdown))
        this.setState({ topicOptions: topicsForDropdown })
      })

    Axios.get(SERVER_URL + '/Systems')
      .then((response) => { return response.data }).then((systems: types.System[]) => {

        let systemsForDropdown: DropdownInterface[] = []
        systems.map((system, id) => {
          var element = {} as DropdownInterface
          element.key = String(system.id)
          element.value = system.id
          element.text = system.name
          systemsForDropdown.push(element)
          //console.log(system)
        })
        //console.log(JSON.stringify(systemsForDropdown))
        this.setState({ systemOptions: systemsForDropdown })
      })

    Axios.get(SERVER_URL + '/Media')
      .then((response) => { return response.data }).then((allMedia: types.Media[]) => {
        this.setState({ media: allMedia, }, () => console.log(this.state.media))
      })

  }

  handleSystem = (value) => {
    this.setState({ chosenSystem: value })
  }

  filterQuestionNumber = (e) => {
    let str = e.target.value;
    let i;
    if (parseInt(str)) {
      i = parseInt(str);
    } else {
      i = 0;
    }
    if (i > 100) {
      i = 100;
    }
    this.setState({
      QuestionCount: i
    });
  }

  incrementQuestionNumber = (event) => {
    event.preventDefault();
    var num = this.state.QuestionCount
    num = num + 1
    this.setState({ QuestionCount: num })
  }

  decrementQuestionNumber = (event) => {
    event.preventDefault();
    var num = this.state.QuestionCount
    if (num > 0)
      num = num - 1
    this.setState({ QuestionCount: num })
  }

  resetQuestions = (event) => {
    event.preventDefault();
    this.setState({ QuestionCount: 0, questions: [] })
  }

  sendData = () => {
    event.preventDefault()
  }

  getData = (question: types.Question) => {
    let exist = false
    var ques: types.Question[] = this.state.questions
    ques.forEach((item, id) => {
      if (id === question.index) {
        exist = true
        item.answers = question.answers
        item.hint = question.hint
        item.media_id = question.media_id
        item.qtext = question.qtext
        item.topic_id = question.topic_id
      }
    })
    if (!exist) {
      ques.push(question)
    }
    this.setState({ questions: ques }, () => { this.setQuiz() })
  }

  setQuiz = (): types.Quiz => {
    let quiz = {} as types.Quiz
    quiz.header = this.state.title
    quiz.system_id = this.state.chosenSystem
    quiz.quiz_type_id = 36
    quiz.questions = this.state.questions

    console.log(quiz)
    return quiz
  }

  sendForm = (): boolean => {
    if (this.state.title === "") {
      alert("Please enter a title for the quiz")
      return false
    } else if (this.state.chosenSystem === -1) {
      alert("Please choose a system for the quiz")
      return false
    }
    if (this.state.questions.length === 0) {
      alert("Please enter valid questions for quiz")
      return false;
    }
    for(var i = 0; i < this.state.questions.length; i++){
      if (this.state.questions[i].answers.length === 0) {
        alert("Plase enter valid answers for questions.")
        return false
      } else if (this.state.questions[i].answers.length != 0) {
        if (this.state.questions[i].answers.length === 1) {
          alert("Please enter more than one answer")
          return false
        }
        let answerControl1 = false
        let answerControl2 = true
        for(var j = 0; j < this.state.questions[i].answers.length; j++ ){
          if (this.state.questions[i].answers[j].correct) {
            answerControl1 = true
          }
        }
        for(var j = 0; j < this.state.questions[i].answers.length; j++ ){
          if (this.state.questions[i].answers[j].atext === "") {
            answerControl2 = false
          }
        }
        if (!answerControl1) {
          alert("Please choose one answer as true")
          return false
        }
        if (!answerControl2) {
          alert("Please enter valid texts for answers")
          return false
        }
      } else if (this.state.questions[i].qtext === "") {
        alert("Please enter valid texts for questions")
        return false
      } else if (this.state.questions[i].hint === "") {
        alert("Please enter a valid hint for questions")
        return false
      } else if (this.state.questions[i].topic_id === -1) {
        alert("Please choose a topic for questions")
        return false
      } else if (this.state.questions[i].media_id === -1) {
        alert("Please choose a media for questions")
        return false
      }
      return true
    }
    console.log("here")
    return true
  }

  renderQuestions = () => {
    let items = []
    for (let i = 0; i < this.state.QuestionCount; i++) {
      items.push(
        <Segment key={i} padded>
          <Label attached='top left'>Question {i + 1}</Label>
          <QuestionInput
            index={i}
            topics={this.state.topicOptions}
            media={this.state.media}
            getData={this.getData}
          />
        </Segment>
      )
    }
    return items
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h1 className={"teal-text"}> Add Quiz </h1>
          <div className={"card-pannel z-depth-5 teal"}>
            <form onSubmit={this.handleSubmit}>
              <div style={{ flex: 1, margin: 10 }}>
                <Label  >
                  <span style={{ marginRight: 48 }} >
                    Header:
                  </span>
                  <Input
                    onChange={e => {
                      this.setState({ title: e.target.value });
                    }}
                    value={this.state.title}
                    style={{ marginLeft: 20 }}
                    size='small'
                    icon='arrow left'
                    placeholder='Header'
                  />
                </Label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <Label>
                  Choose System:
                  <Dropdown

                    placeholder='System'
                    selection
                    style={{ marginLeft: 20 }}
                    //defaultValue={this.state.chosenSystem} 
                    options={this.state.systemOptions}
                    onChange={(event, data) => { this.handleSystem(data.value); }} />
                </Label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <Label>
                  <span style={{ marginRight: 10 }} >
                    Add Question:
                  </span>
                  <Input
                    onChange={e => {
                      this.filterQuestionNumber(e)
                    }}
                    value={this.state.QuestionCount}
                    style={{ marginLeft: 20, marginTop: 5, marginRight: 0, borderRadius: '0px' }}
                    size='small'
                    placeholder='Header'
                    action={
                      <div>
                        <Button basic className="ui button" onClick={(event) => { this.decrementQuestionNumber(event) }} color='red' id="but" content='' icon="minus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                        <Button basic className="ui button" onClick={(event) => { this.incrementQuestionNumber(event) }} color='green' id="but" content='' icon="plus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                        <Button basic className="ui button" onClick={(event) => { this.resetQuestions(event) }} color='orange' id="but3" content='' icon="repeat" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                      </div>
                    }
                  />
                  <Button size='small' onClick={() => { this.sendData() }}> Send Data </Button>
                </Label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <p> Sorular:</p>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      {this.renderQuestions()}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <h1 className={"teal-text"}> Önceki quizler</h1>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddQuiz);
