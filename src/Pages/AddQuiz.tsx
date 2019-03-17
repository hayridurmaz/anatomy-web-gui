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

  };
  questionElements = [];
  handleSubmit = event => {
    if (this.state.title === "") {
      alert("Lütfen boş alan bırakmayınız");
      event.preventDefault();
      return;
    }
    if (window.confirm("Quizi göndermek istediğine emin misin?")) {
      let sur = this.state.survey as any;
      sur.name = this.state.title;
      sur.valid = true;
      sur.voters = [];
      //TODO: Send the quiz onto webservice.
      this.setState({ title: "", isSent: true });
      setTimeout(() => {
        this.setState({ isSent: false });
      }, 1500);
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
          element.key = topic.name
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
          element.key = system.name
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
    this.setState({ QuestionCount: 0 })
  }

  renderQuestions = () => {
    let items = []
    for (let i = 0; i < this.state.QuestionCount; i++) {
      items.push(
        <Segment padded>
          <Label attached='top left'>Question {i + 1}</Label>
          <QuestionInput
            index={i}
            topics={this.state.topicOptions}
            media={this.state.media}
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
                        <Button basic class="ui button" onClick={(event) => { this.decrementQuestionNumber(event) }} color='red' id="but" content='' icon="minus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                        <Button basic class="ui button" onClick={(event) => { this.incrementQuestionNumber(event) }} color='green' id="but" content='' icon="plus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                        <Button basic class="ui button" onClick={(event) => { this.resetQuestions(event) }} color='orange' id="but3" content='' icon="repeat" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                      </div>
                    }
                  />
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
