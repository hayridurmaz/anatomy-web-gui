import * as React from "react";
import * as types from "../store/types";
import AnswerInput from "./AnswerInput";
import { Input, Dropdown, Button, Label, Grid, Segment, Image, Item } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import MediaPopup from "./MediaPopup"


interface IProps {
  index: number;
  topics: any[];
  media: types.Media[];
  getData: (question: types.Question) => any;
}

export default class QuestionInput extends React.Component<IProps> {
  questionElements = [];
  state = {
    questionText: "",
    hint: "",
    mediaId: -1 as Number,
    topicId: -1 as Number,
    AnswerCount: 0,
    correctAnswerIndex: -100 as Number,
    openModal: false as boolean,
    answers: [] as types.Answer[],
  };

  componentWillReceiveProps(nextProps: IProps) {
  
  }

  componentWillMount = () => {
    //console.log(this.props.topics)
  }
  handleTopic = (value) => {
    this.setState({ topicId: value }, () => {this.sendDataParent()})
  }

  filterAnswerNumber = (e) => {
    let str = e.target.value;
    let i;
    if (parseInt(str)) {
      i = parseInt(str);
    } else {
      this.setState({ correctAnswerIndex: -100 })
      i = 0;
    }
    if (i > 100) {
      i = 100;
    }
    this.setState({
      AnswerCount: i
    });
  }

  incrementAnswerNumber = (event) => {
    event.preventDefault();
    var num = this.state.AnswerCount
    num = num + 1
    this.setState({ AnswerCount: num })
  }

  decrementAnswerNumber = (event) => {
    event.preventDefault();
    var num = this.state.AnswerCount
    if (num > 0)
      num = num - 1
    if (num === 0)
      this.setState({ correctAnswerIndex: -100 })
    this.setState({ AnswerCount: num })
  }

  resetAnswers = (event) => {
    event.preventDefault();
    this.setState({ correctAnswerIndex: -100, AnswerCount: 0, answers: [] })
  }

  renderAnswers = () => {
    let items = []
    for (let i = 0; i < this.state.AnswerCount; i++) {
      //console.log(i)
      items.push(
        <AnswerInput
          key={i}
          index={i}
          isCorrect={this.state.correctAnswerIndex === i}
          setCorrectAnswerIndex={this.setCorrectAnswerIndex}
          controlVar={this.state.correctAnswerIndex}
          getData={this.getData}
        />
      )
    }
    return items
  }

  sendData = () => {
    event.preventDefault()
  }

  getData = (answer: types.Answer) => {
    let exist = false
    let anss = this.state.answers
    console.log(anss)
    anss.forEach((Item) => {
      if (Item.id === answer.id) {
        exist = true
        Item.atext = answer.atext
        Item.correct = answer.correct
      }
    })
    if (!exist) {
    anss.push(answer)
    }
    this.setState({ answers: anss}, () => {
      this.sendDataParent()
    })
    //console.log(this.state.answers)
  }

  sendDataParent = () => {
    let que = {} as types.Question
    que.qtext = this.state.questionText
    que.hint = this.state.hint
    que.media_id = this.state.mediaId
    que.topic_id = this.state.topicId
    que.answers = this.state.answers
    que.id = this.props.index
    this.props.getData(que)
  }

  setCorrectAnswerIndex = (index: Number): any => {
    //console.log(index)
    this.setState({ correctAnswerIndex: index })
  }

  setModal = (control: boolean) => {
    event.preventDefault()
    this.setState({ openModal: control })
  }

  setMediaIndex = (index : number) => {
    this.setState({mediaId : index}, () => {this.sendDataParent()})
  }

  render() {
    return (
      <div key={this.props.index}>
        <div style={{ flex: 1, margin: 10 }}>
          <Label  >
            <span style={{ marginRight: 5 }} >
              Question text:
            </span>
            <Input
              onChange={e => {
                this.setState({ questionText: e.target.value }, () => {this.sendDataParent()});
              }}
              value={this.state.questionText}
              style={{ marginLeft: 20 }}
              size='small'
              icon='arrow left'
              placeholder='Question text'
            />
          </Label>
        </div>
        <div style={{ flex: 1, margin: 10 }}>
          <Label  >
            <span style={{ marginRight: 58 }} >
              Hint:
            </span>
            <Input
              onChange={e => {
                this.setState({ hint: e.target.value }, () => {this.sendDataParent()});
              }}
              value={this.state.hint}
              style={{ marginLeft: 20 }}
              size='small'
              icon='arrow left'
              placeholder='Hint'
            />
          </Label>
        </div>
        <div style={{ flex: 1, margin: 10 }}>
          <Label  >
            <span style={{ marginRight: 22 }} >
              Choose Topic:
            </span>
            <Dropdown placeholder='Topic' selection options={this.props.topics} onChange={(event, data) => { this.handleTopic(data.value); }} />
          </Label>
        </div>
        <div style={{ flex: 1, margin: 10 }}>
          <Label  >
            <span style={{ marginRight: 39 }} >
              Add Media:
            </span>
            <Button size='small' onClick={() => { this.setModal(true) }} > Add Media </Button>
            <Button size='small' onClick={() => { this.sendData() }}> Send Data </Button>
          </Label>
        </div>
        <div style={{ flex: 1, margin: 10 }}>
          {/*<p> Answers:</p>*/}
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Segment padded>
                  <Label attached='top left'>Answers</Label>
                  <div style={{ flex: 1, margin: 10 }}>
                    <Label >
                      <span style={{ marginRight: 10 }} >
                        Add Answer
                      </span>
                      <Input
                        onChange={e => {
                          this.filterAnswerNumber(e)
                        }}
                        value={this.state.AnswerCount}
                        style={{ marginLeft: 20, marginTop: 5, marginRight: 0, borderRadius: '0px' }}
                        size='small'
                        placeholder='Header'
                        action={
                          <div>
                            <Button basic className="ui button" onClick={(event) => { this.decrementAnswerNumber(event) }} color='red' id="but1" content='' icon="minus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                            <Button basic className="ui button" onClick={(event) => { this.incrementAnswerNumber(event) }} color='green' id="but2" content='' icon="plus" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                            <Button basic className="ui button" onClick={(event) => { this.resetAnswers(event) }} color='orange' id="but3" content='' icon="repeat" style={{ margin: 0, marginLeft: 2, borderRadius: 2, fontWeight: "bold", fontSize: 11.5, width: 43 }} />
                          </div>
                        }
                      />
                    </Label>
                  </div>
                  {this.renderAnswers()}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <MediaPopup openModal={this.state.openModal} setModal={this.setModal} media={this.props.media} setMediaIndex={this.setMediaIndex} />
        </div>
      </div>
    );
  }
}
