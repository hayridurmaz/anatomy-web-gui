import * as React from "react";
import { Input, Dropdown, Button, Label, Grid, Segment, Image } from 'semantic-ui-react'
import * as types from "../store/types";

interface IProps {
  index: Number;
  isCorrect: Boolean;
  setCorrectAnswerIndex: (index : Number) => any;
  controlVar: Number;
  sendData: boolean;
  getData: (ans : types.Answer) => any;
}

export default class AnswerInput extends React.Component<IProps> {
  questionElements = [];
  state = {
    atext: "" as String,
    question_id: -1 as Number,
    correct: false as Boolean,
    inputColor: "",
    inputIcon: "checkmark",
    inputContent: "Correct"
  };

  componentWillReceiveProps(newProp: IProps) {
    if (newProp.isCorrect && newProp.controlVar != -100 ){
      this.setState({inputColor: "green", inputIcon: "checkmark", inputContent: "Correct", correct: true})
    }else if (!newProp.isCorrect && newProp.controlVar != -100 ){
      this.setState({inputColor: "red", inputIcon: "close", inputContent: "Not Correct", correct: false})
    }
    if(newProp.sendData){
      let ans  = {} as types.Answer 
      ans.atext = this.state.atext
      ans.correct = this.state.correct
      ans.id = this.props.index
      this.props.getData(ans)
    }
  }

  MakeCorrect = () => {
    event.preventDefault()
    this.props.setCorrectAnswerIndex(this.props.index)
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
              this.setState({ atext: e.target.value });
            }}
            value={this.state.atext}
            style={{ marginLeft: 20, color: "red" }}
            size='small'
            //icon='checkmark'
            placeholder='Answer'
            action={{ color: this.state.inputColor, labelPosition: 'right', icon: this.state.inputIcon, content: this.state.inputContent, onClick: this.MakeCorrect}}
            
          />
        </Label>
      </div>
    );
  }
}
