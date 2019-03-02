import * as React from "react";
import AnswerInput from "./AnswerInput";

interface IProps {
  sendSurveyBack(q, i): any;
  index: number;
  isSent: boolean;
}

export default class QuestionInput extends React.Component<IProps> {
  questionElements = [];
  state = {
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans5: ""
  };
  componentWillReceiveProps(newP: IProps) {
    if (newP.isSent) {
      this.setState({
        question: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        ans5: ""
      });
    }
  }
  soruEkle = () => {
    if (this.state.question === "" || this.state.ans1 === "") {
      return;
    }
    let a = [];
    a.push({ count: 0, text: this.state.ans1 });

    if (this.state.ans2 !== "") {
      a.push({ count: 0, text: this.state.ans2 });
    }
    if (this.state.ans3 !== "") {
      a.push({ count: 0, text: this.state.ans3 });
    }
    if (this.state.ans4 !== "") {
      a.push({ count: 0, text: this.state.ans4 });
    }
    if (this.state.ans5 !== "") {
      a.push({ count: 0, text: this.state.ans5 });
    }
    let q = { question: this.state.question, answers: a };
    this.props.sendSurveyBack(q, this.props.index);
  };

  render() {
    return (
      <div key={this.props.index}>
        <p>Soru {this.props.index + 1}: </p>
        <input
          value={this.state.question}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ question: e.target.value }, this.soruEkle);
          }}
        />
        <p>Şıklar(Lütfen fazla şıkları boş bırakın)</p>
        <p>Şık 1:</p>
        <input
          value={this.state.ans1}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ ans1: e.target.value }, this.soruEkle);
          }}
        />
        <p>Şık 2:</p>
        <input
          value={this.state.ans2}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ ans2: e.target.value }, this.soruEkle);
          }}
        />
        <p>Şık 3:</p>
        <input
          value={this.state.ans3}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ ans3: e.target.value }, this.soruEkle);
          }}
        />{" "}
        <p>Şık 4:</p>
        <input
          value={this.state.ans4}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ ans4: e.target.value }, this.soruEkle);
          }}
        />{" "}
        <p>Şık 5:</p>
        <input
          value={this.state.ans5}
          style={{ marginLeft: 20 }}
          onChange={e => {
            this.setState({ ans5: e.target.value }, this.soruEkle);
          }}
        />
        <hr />
      </div>
    );
  }
}
