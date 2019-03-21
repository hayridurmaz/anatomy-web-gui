import * as React from "react";
import { Input, Dropdown, Button, Label, Grid, Segment, Image } from 'semantic-ui-react'
import * as types from "../store/types";

interface IProps {
  index: Number;
  isCorrect: Boolean;
  setCorrectAnswerIndex: (index: Number, fun : () => any) => any;
  controlVar: Number;
  getData: (ans: types.Answer) => any;
}

export default class AnswerInput extends React.Component<IProps> {
  questionElements = [];
  state = {
    atext: "" as String,
    question_id: -1 as Number,
    correct: false as Boolean,
    inputColor: "grey",
    inputIcon: "checkmark",
    inputContent: "Correct",
  };

  componentWillReceiveProps(newProp: IProps) {

    if (newProp.isCorrect && newProp.controlVar != -100) {
      this.setState({ inputColor: "green", inputIcon: "checkmark", inputContent: "Correct", correct: true })
    } else if (!newProp.isCorrect && newProp.controlVar != -100) {
      this.setState({ inputColor: "red", inputIcon: "close", inputContent: "Not Correct", correct: false })
    }
    /*if(newProp.sendData){
      let ans  = {} as types.Answer 
      ans.atext = this.state.atext
      ans.correct = this.state.correct
      ans.id = this.props.index
      this.props.getData(ans)
    }*/
  }

  MakeCorrect = () => {
    event.preventDefault()
    this.props.setCorrectAnswerIndex(this.props.index, this.sendDataParent)
  }

  setText = (text: string) => {
    this.setState({ atext: text }, () => {
      this.sendDataParent()
    });
  }

  sendDataParent = () => {
    let ans = {} as types.Answer
    ans.atext = this.state.atext
    ans.correct = this.state.correct // there may be delay between setting correct var and sending the index to parent !!!!!!!
    ans.index = this.props.index
    this.props.getData(ans)
  }

  render() {
    return (
      <div style={{ flex: 1, margin: 10 }}>
        <Label  >
          <span style={{ marginRight: 28 }} >
            Answer:
            </span>
          <Input
            onChange={e => {
              this.setText(e.target.value)
            }}
            value={this.state.atext}
            style={{ marginLeft: 20, color: "red" }}
            size='small'
            //icon='checkmark'
            placeholder='Answer'
            action={{ color: this.state.inputColor, labelPosition: 'right', icon: this.state.inputIcon, content: this.state.inputContent, onClick: this.MakeCorrect }}

          />
        </Label>
      </div>
    );
  }
}
