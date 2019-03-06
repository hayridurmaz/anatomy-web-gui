import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
import Axios from "axios";
import { Segment } from "semantic-ui-react";
import { format } from "path";
var ProgressBar = require("react-progressbar").default;

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddSystem extends React.Component<IProps & ReduxProps> {
  state = {
    news: "",
    title: "",
    tarih: "",
    yazar: "Öğrenci Konseyi",
    systemsArray: [] as types.System[],
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
  }

  componentDidMount() {
    Axios.get("http://188.166.49.57:8080/Systems").then(response => {
      this.setState({ systemsArray: response.data });
      console.log(response.data);
    });
  }

  renderSystems = () => {
    if (this.state.systemsArray.length <= 10) {
      return this.state.systemsArray.map((item, id) => {
        return <Segment pilled>{item.name}</Segment>;
      });
    } else {
      let arr = this.state.systemsArray.slice(
        this.state.systemsArray.length - 10,
        this.state.systemsArray.length
      );
      return arr.map((item, id) => {
        return (
          <div key={id}>
            <Link to={{ pathname: "/detailNews", state: { news: item } }}>
              <h3 className={"white-text"}>{item["header"]}</h3>
            </Link>
            <p key={id}>
              {"" + item["content"].substr(0, 30)}
              ...
            </p>
            Gösterilsin mi:{" "}
            <ToggleButton
              value={item["valid"] || false}
              onToggle={value => {
                item["valid"] = !value;
              }}
            />
            <hr />
          </div>
        );
      });
    }
  };
  handleOptionChange = changeEvent => {
    this.setState({
      selectedDuyuruTipi: changeEvent.target.value
    });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
  };

  form = () => {
    let progressing;
    if (this.state.isUploading || this.state.progress === 100) {
      progressing = (
        <div
          style={{
            width: 150,
            borderStyle: "solid",
            borderColor: "green"
          }}
        >
          <ProgressBar completed={this.state.progress} />
        </div>
      );
    } else {
      progressing = <div />;
    }
    return (
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

        <label>
          <div style={{ flex: 1, margin: 10 }}>
            <p> Haber:</p>
            <textarea
              value={this.state.news}
              style={{ height: 300, width: 900 }}
              onChange={e => {
                this.setState({ news: e.target.value });
              }}
            />
          </div>
        </label>
        <div style={{ flex: 1, margin: 10 }}>
          <label>
            Tarih:
            <input value={this.state.tarih} style={{ marginLeft: 20 }} />
          </label>
        </div>
        <div style={{ flex: 1, margin: 10 }}>
          <label>
            Yazar:
            <input
              value={this.state.yazar}
              contentEditable={true}
              style={{ marginLeft: 20 }}
            />
          </label>
        </div>

        <div style={{ flex: 1, margin: 10 }}>
          <label>
            Resim:
            {/* <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          /> */}
            {progressing}
          </label>
        </div>

        <div style={{ flex: 1, margin: 10 }}>
          <label>
            Haber tipi:
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="duyuru"
                  checked={this.state.selectedDuyuruTipi === "duyuru"}
                  onChange={this.handleOptionChange}
                />
                Duyuru
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="etkinlik"
                  checked={this.state.selectedDuyuruTipi === "etkinlik"}
                  onChange={this.handleOptionChange}
                />
                Etkinlik
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="haber"
                  checked={this.state.selectedDuyuruTipi === "haber"}
                  onChange={this.handleOptionChange}
                />
                Haber
              </label>
            </div>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h1 className={"teal-text"}> Haber ekle</h1>
          <div className={"card-pannel z-depth-5 teal"}>{this.form()}</div>
          <h1 className={"teal-text"}> Haberler</h1>
          <Segment.Group>{this.renderSystems()}</Segment.Group>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddSystem);
