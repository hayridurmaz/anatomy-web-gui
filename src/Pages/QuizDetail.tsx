import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import * as types from "../store/types";
import { connect } from "react-redux";

interface Iprops {
  news: any;
  location: any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class QuizDetail extends React.Component<Iprops & ReduxProps> {
  renderAnswers = ans => {
    return ans.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <h5>{item["text"]}</h5>
          <p key={id}>{"Cevap sayısı: " + item["count"]}</p>
        </div>
      );
    });
  };

  renderQuestion = () => {
    return this.props.location.state.news.questions.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <h3>{item["question"]}</h3>
          {this.renderAnswers(item.answers)}
          <hr />
        </div>
      );
    });
  };
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container "}>
          <h1>{this.props.location.state.news.name}</h1>
          <span style={{ whiteSpace: "pre-line" }}>
            {this.renderQuestion()}
          </span>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(QuizDetail);
