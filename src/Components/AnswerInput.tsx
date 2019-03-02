import * as React from "react";

interface IProps {
  questionNumber: number;
}

export default class AnswerInput extends React.Component<IProps> {
  questionElements = [];

  componentWillReceiveProps(newProp: IProps) {
    this.questionElements = [];
    for (let index = 0; index < newProp.questionNumber; index++) {
      let el = (
        <div>
          <p>Cevap {index + 1}: </p>
          <input />
        </div>
      );
      this.questionElements.push(el);
    }
  }
  takeQuestions = () => {
    return this.questionElements.map((item, id) => {
      return item;
    });
  };
  render() {
    return <div>{this.takeQuestions()}</div>;
  }
}
