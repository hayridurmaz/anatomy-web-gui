import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import Login from "./Login";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
import FileUploader from "react-firebase-file-uploader";
import Axios from "axios";
import { Dropdown } from 'semantic-ui-react'
import { type } from "os";
import ImageRow from "../Components/ImageRow"

var ProgressBar = require("react-progressbar").default;

interface IProps { }
interface ReduxProps {
    isLoggedIn?: boolean;
}
class AddImage extends React.Component<IProps & ReduxProps> {
    state = {
        tarih: "",
        isUploading: false,
        progress: 0,
        topicOptions: [],
        systemOptions: [],
        chosenTopics: [] as number[],
        chosenSystem: -1 as number,
        dataUrl: "",
        images: [] as types.Media[],


    };

    handleSubmit = event => {
        if (this.state.chosenSystem === -1 || this.state.chosenTopics.length === 0) {
            alert("Fill all fields");
            event.preventDefault();
            return;
        }
        if (window.confirm("Haberi göndermek istediğine emin misin?")) {
            event.preventDefault();
            /*let image = {
                 author: this.state.yazar,
                 content: this.state.news,
                 date: this.state.tarih,
                 header: this.state.title,
                 type: this.state.selectedDuyuruTipi,
                 links: [{ url: "" }],
                 id: "",
                 valid: true,
                 image: this.state.dataUrl
            };*/
            /*firebase
              .database()
              .ref("councilNews")
              .push(news)
              .then(RE => {
                news.id = RE.getKey();
                firebase
                  .database()
                  .ref("councilNews")
                  .child(news.id)
                  .set(news);
              });*/
            //console.log(this.state.chosenSystem)
            //console.log(this.state.chosenTopics)
            //console.log(this.state.dataUrl)
            let media = {} as types.Media
            media.data_url = this.state.dataUrl
            media.media_type = types.mediaTypes.image
            media.system_id = this.state.chosenSystem
            media.topic_ids = this.state.chosenTopics
            media.thumbnail_url = ""
            media.date = this.state.tarih
            console.log(JSON.stringify(media))

            Axios.post("http://localhost:8080/Media", {
                data_url: media.data_url,
                media_type: media.media_type,
                thumbnail_url: media.thumbnail_url,
                system_id: media.system_id,
                topic_ids: media.topic_ids,
                date: media.date
            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
            this.getDataFromServer() //to get newly added pictures 
                }
            }).catch(error => console.log(error))
            this.setState({ chosenSystem: -1, chosenTopics: [], dataUrl: "", progress: 0 });
            this.getDataFromServer() //to get newly added pictures 
        }
        event.preventDefault();
    };

    componentWillMount() {
        this.setState({ tarih: getDate() });
        firebase
            .database()
            .ref("/councilNews")
            .on("value", response => {
                let arr = [];
                response.forEach(child => {
                    arr.push(child.val());
                    this.setState({ newsArray: arr });
                });
            });
        this.getDataFromServer()
    }

    getDataFromServer = () => {
        interface DropdownInterface {
            key: string,
            value: number,
            text: string
        }
        // stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
        Axios.get('http://188.166.49.57:8080/Topics')
            .then((response) => { return response.data }).then((topics: types.Topic[]) => {
                let topicsForDropdown: DropdownInterface[] = []
                topics.map((topic, id) => {
                    var element = {} as DropdownInterface
                    element.key = topic.name
                    element.value = topic.id
                    element.text = topic.name
                    topicsForDropdown.push(element)
                    //console.log(topic)
                })
                //console.log(JSON.stringify(topicsForDropdown))
                this.setState({ topicOptions: topicsForDropdown })
            })

        Axios.get('http://188.166.49.57:8080/Systems')
            .then((response) => { return response.data }).then((systems: types.System[]) => {

                let systemsForDropdown: DropdownInterface[] = []
                systems.map((system, id) => {
                    var element = {} as DropdownInterface
                    element.key = system.name
                    element.value = system.id
                    element.text = system.name
                    systemsForDropdown.push(element)
                    //console.log(system)
                })
                //console.log(JSON.stringify(systemsForDropdown))
                this.setState({ systemOptions: systemsForDropdown })
            })

        Axios.get('http://188.166.49.57:8080/Media')
            .then((response) => { return response.data }).then((currImages: types.Media[]) => {
                this.setState({ images: currImages }, () => console.log(this.state.images))
            })

    }


    renderImages = () => {
        return this.state.images.map((item, id) => {
            return (
                <ImageRow
                    key={id}
                    item={item}
                    topics={this.state.topicOptions}
                    systems={this.state.systemOptions}
                    refreshData={this.getDataFromServer}
                />
            );
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
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ dataUrl: url }));
    };

    renderHOC = (wrappedComponent: React.Component, isLoggedIn: boolean) => {
        return class HOC extends React.Component {
            render() {
                if (isLoggedIn) {
                    return (
                        wrappedComponent
                    )
                } else {
                    return (
                        <Redirect to="/login" />
                    )
                }

            }
        }
    }

    handleTopic = (value) => {
        this.setState({ chosenTopics: value })
    }

    handleSystem = (value) => {
        this.setState({ chosenSystem: value })
    }

    render() {
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
        if (this.props.isLoggedIn) {
            return (
                <div className={"container"}>
                    <h1 className={"teal-text"}>Add Image</h1>
                    <div className={"card-pannel z-depth-5 teal"}>
                        <form onSubmit={this.handleSubmit}>

                            <div style={{ flex: 1, margin: 10 }}>
                                <label>
                                    Choose Topic:
                  <Dropdown placeholder='Topic' fluid multiple selection defaultValue={this.state.chosenTopics} options={this.state.topicOptions} onChange={(event, data) => { this.handleTopic(data.value); }} />
                                </label>
                            </div>

                            <div style={{ flex: 1, margin: 10 }}>
                                <label>
                                    Choose System:
                  <Dropdown placeholder='System' fluid selection defaultValue={this.state.chosenSystem} options={this.state.systemOptions} onChange={(event, data) => { this.handleSystem(data.value); }} />
                                </label>
                            </div>

                            <div style={{ flex: 1, margin: 10 }}>
                                <label>
                                    Choose image:
                  <FileUploader
                                        accept="image/*"
                                        name="avatar"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                    {progressing}
                                </label>
                            </div>

                            <div style={{ flex: 1, margin: 10 }}>
                                <label>
            {/*Date: */}
                                <input hidden value={this.state.tarih} style={{ marginLeft: 20 }} />
                                </label>
                            </div>
                            <input style={{ marginLeft: 20 }}  type="submit" value="Submit" />
                        </form>
                    </div>
                    <h1 className={"teal-text"}> Images</h1>
                    {this.renderImages()}
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddImage);