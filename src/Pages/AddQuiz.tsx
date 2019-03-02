import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Questions from "../Components/Questions";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddQuiz extends React.Component<IProps & ReduxProps> {
  state = {
    survey: {},
    news: "",
    QuestionCount: 0,
    title: "",
    isSent: false,
    surveyArray: []
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
  }

  renderQuestion = () => {
    return this.state.surveyArray.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <Link to={{ pathname: "/detailNews", state: { news: item } }}>
            <h3>{item["header"]}</h3>
          </Link>
          <p key={id}>{"" + item["name"]}</p>
          <hr />
        </div>
      );
    });
  };

  renderSurveys = () => {
    if (this.state.surveyArray.length <= 10) {
      return this.state.surveyArray.map((item, id) => {
        // console.log(JSON.stringify(item));
        return (
          <div key={id} style={{ border: "10px black" }}>
            <Link to={{ pathname: "/detailSurvey", state: { news: item } }}>
              <h3>{item["name"]}</h3>
            </Link>
            <p key={id}>{"" + item["name"]}</p>
            Gösterilsin mi:{" "}
            <ToggleButton
              value={item["valid"] || false}
              onToggle={value => {}}
            />
            <hr />
          </div>
        );
      });
    } else {
      let arr = this.state.surveyArray.slice(
        this.state.surveyArray.length - 10,
        this.state.surveyArray.length
      );
      return arr.map((item, id) => {
        return (
          <div key={id}>
            <Link to={{ pathname: "/detailSurvey", state: { news: item } }}>
              <h3>{item["name"]}</h3>
            </Link>
            <p key={id}>{"" + item["content"]}</p>
            <hr />
          </div>
        );
      });
    }
  };
  takeQuestions = () => {
    return this.questionElements.map((item, id) => {
      return item;
    });
  };
  takeAQuestion = () => {
    return (
      <div>
        <p>Soru input</p>
      </div>
    );
  };
  takeSurveyBack = survey => {
    this.setState({ survey: survey });
  };
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h1 className={"teal-text"}> Quiz ekle</h1>
          <div className={"card-pannel z-depth-5 teal"}>
            <form onSubmit={this.handleSubmit}>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Başlık:
                  <input
                    value={this.state.title}
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ title: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Soru sayısı:
                  <input
                    value={this.state.QuestionCount}
                    style={{ marginLeft: 20 }}
                    onChange={e => {
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
                    }}
                  />
                </label>
              </div>
              <label>
                <div style={{ flex: 1, margin: 10 }}>
                  <p> Sorular:</p>
                  <Questions
                    isSent={this.state.isSent}
                    sendSurveyBack={this.takeSurveyBack}
                    questionNumber={this.state.QuestionCount}
                  />
                </div>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <h1 className={"teal-text"}> Önceki quizler</h1>
          {this.renderSurveys()}
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
