import * as React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import Navigation from "./Components/Navigation";
import Login from "./Pages/Login";
import AddClass from "./Pages/AddClass";
import ClassDetail from "./Pages/ClassDetail";
import AddQuiz from "./Pages/AddQuiz";
import QuizDetail from "./Pages/QuizDetail";
import Logout from "./Components/Logout";

class App extends React.Component {
  constructor(prop: any) {
    super(prop);
  }
  render() {
    return (
      <div>
        <Navigation />
        {/**
         *  route to diffrent component
         */}
        <Route exact={true} path={"/quizzes"} component={AddQuiz} />
        <Route exact={true} path={"/classes"} component={AddClass} />
        <Route exact={true} path={"/detailClasses"} component={ClassDetail} />
        <Route exact={true} path={"/detailQuizzes"} component={QuizDetail} />
        <Route exact={true} path={"/login"} component={Login} />
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/logout"} component={Logout} />
      </div>
    );
  }
}

export default App;
