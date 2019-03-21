import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate, SERVER_URL } from "../utils/utils";
import Axios from "axios";
var ProgressBar = require("react-progressbar").default;

interface IProps { }
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddClass extends React.Component<IProps & ReduxProps> {
  state = {
    news: "",
    title: "",
    tarih: "",
    yazar: "Öğrenci Konseyi",
    classesArray: [] as types.Quiz[],
    selectedDuyuruTipi: "duyuru",
    imgUrl: "",
    isUploading: false,
    progress: 0
  };

  handleSubmit = event => {
    if (this.state.news === "" || this.state.title === "") {
      alert("Lütfen boş alan bırakmayın");
      event.preventDefault();

      return;
    }
    if (window.confirm("Haberi göndermek istediğine emin misin?")) {
      /* let news = {
        author: this.state.yazar,
        content: this.state.news,
        date: this.state.tarih,
        header: this.state.title,
        type: this.state.selectedDuyuruTipi,
        links: [{ url: "" }],
        id: "",
        valid: true,
        image: this.state.imgUrl
      }; */
      //TODO: Send to the webservice
      this.setState({ news: "", title: "" });
    }
    event.preventDefault();
  };
  componentWillMount() {
    this.setState({ tarih: getDate() });
    //TODO: Get
    this.getClasses();
  }

  getClasses = () => {
    Axios.get(SERVER_URL + '/Classes')
      .then((response) => { return response.data }).then((classes: types.Class[]) => {
        let topicsForDropdown: types.Class[] = []
        classes.map((topic, id) => {
          var element = topic as types.Class

          topicsForDropdown.push(element)
          console.log(topic)
        })
        //console.log(JSON.stringify(topicsForDropdown))
        this.setState({ classesArray: topicsForDropdown })
      })
  }

  renderClasses = () => {

    return this.state.classesArray.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <Link to={{ pathname: "/detailClasses", state: { classes: item } }}>
            <h3 className={"white-text"}>{item["name"]}</h3>
          </Link>
          <hr />
        </div>
      );
    });

  };




  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h1>Classes</h1>
          {this.renderClasses()}
        </div>)
    }
    else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddClass);
