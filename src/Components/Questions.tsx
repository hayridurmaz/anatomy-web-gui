import * as React from "react";
import QuestionInput from "./QuestionInput";

interface IProps {
  questionNumber: number;
  sendSurveyBack(survey): any;
  isSent: boolean;
}

export default class Questions extends React.Component<IProps> {
  questionElements = [];
  state = {
    survey: {
      questions: []
    }
  };

  componentWillReceiveProps(newProp: IProps) {
    this.questionElements = [];
    for (let index = 0; index < newProp.questionNumber; index++) {
      this.questionElements.push("pushed");
    }
  }
  addQuestionToSurvey = (a, i) => {
    let s = this.state.survey;
    if (
      s.questions.length >= this.props.questionNumber ||
      s.questions.length >= i + 1
    ) {
      s.questions.pop();
    }
    s.questions.push(a);
    this.setState({ survey: s }, this.props.sendSurveyBack(this.state.survey));
  };
  takeQuestions = () => {
    return this.questionElements.map((item, id) => {
      return (
        null
      );
    });
  };
  render() {
    return <div>{this.takeQuestions()}</div>;
  }
}
