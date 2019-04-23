import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
import * as firebase from "firebase";
import Axios from "axios";
import {
  Segment,
  Button,
  Form,
  Message,
  Icon,
  Input,
  Item,
  List,
  Label,
  Image,
  Dropdown
} from "semantic-ui-react";
import InlineEdit from "react-edit-inline";
import { format } from "path";
import { type } from "os";
import { setServers } from "dns";
var ProgressBar = require("react-progressbar").default;

interface IProps {
  item: types.Media;
  systems: types.System[];
  topics: types.Topic[];
  refreshData: () => any;
}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class ImageRow extends React.Component<IProps & ReduxProps> {
  state = {
    editedStr: "",
    modify: false,
    chosenTopics: [] as number[],
    chosenSystem: -1 as number,
    disabledSaveButton: false as boolean
  };

  componentWillMount = () => {
    this.setDefaultData();
  };

  setDefaultData = () => {
    var defVals = [] as number[];
    this.props.item.topics.forEach((topic, key) => {
      defVals.push(topic.id);
    });
    this.setState({ chosenTopics: defVals });
    this.setState({ chosenSystem: this.props.item.system.id });
  };

  saveImage = (event, mediaId: number) => {
    if (
      this.state.chosenSystem === -1 ||
      this.state.chosenTopics.length === 0
    ) {
      alert("Fill all fields");
      event.preventDefault();
      return;
    }
    var defVals = [] as number[];
    this.props.item.topics.forEach((topic, key) => {
      defVals.push(topic.id);
    });
    if (
      this.state.chosenSystem === this.props.item.system.id &&
      JSON.stringify(this.state.chosenTopics) === JSON.stringify(defVals)
    ) {
      alert("Nothing changed");
      event.preventDefault();
      return;
    }
    if (window.confirm("Are you sure to modify image?")) {
      event.preventDefault();
      let media = {} as types.Media;
      media.data_url = this.props.item.data_url;
      media.media_type = this.props.item.media_type;
      media.system_id = this.state.chosenSystem;
      media.topic_ids = this.state.chosenTopics;
      media.thumbnail_url = "";
      console.log(JSON.stringify(media));

      Axios.put("http://188.166.49.57:8080/Media/" + mediaId, {
        data_url: media.data_url,
        media_type: media.media_type,
        thumbnail_url: media.thumbnail_url,
        system_id: media.system_id,
        topic_ids: media.topic_ids
      })
        .then(res => {
          //console.log(res)
          if (res.status === 200) {
            this.props.refreshData(); //to get newly added pictures and changes
          }
        })
        .catch(error => console.log(error));
      this.setState({ chosenSystem: -1, chosenTopics: [], modify: false });
    }
    event.preventDefault();
  };

  modifyImage = () => {
    this.setDefaultData(); //fill state with default data in props
    this.setState({ modify: true });
  };

  deleteImage = (mediaId: number) => {
    if (window.confirm("Are you sure to modify image?")) {
      Axios.delete("http://188.166.49.57:8080/Media/" + mediaId)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            firebase
              .storage()
              .refFromURL(this.props.item.data_url)
              .delete()
              .then(() => {
                // File deleted successfully
                this.props.refreshData(); //to get newly added pictures and changes
              })
              .catch(function(error) {
                // Uh-oh, an error occurred!
                console.log(error);
                alert("Image cannot be deleted. Contact admin.");
              });
          }
        })
        .catch(error => console.log(error));
    }
  };

  handleTopic = value => {
    console.log(value);
    this.setState({ chosenTopics: value });
  };

  handleSystem = value => {
    console.log(value);
    this.setState({ chosenSystem: value });
  };

  cancelModify = () => {
    this.setState({ modify: false, chosenSystem: -1, chosenTopics: [] });
  };

  buttonDisable = () => {
    console.log(this.state.chosenSystem);

    console.log(this.state.chosenTopics);
    if (this.state.chosenSystem === -1 || this.state.chosenTopics === []) {
      this.setState({ disabledSaveButton: true });
    } else {
      this.setState({ disabledSaveButton: false });
    }
  };

  render() {
    //console.log(this.props.systems)
    //console.log(this.props.topics)
    let topicInfo;
    let systemInfo;
    let buttons;
    if (this.state.modify) {
      topicInfo = (
        <Dropdown
          placeholder="Topic"
          style={{ marginLeft: 20 }}
          defaultValue={this.state.chosenTopics}
          multiple
          selection
          options={this.props.topics}
          onChange={(event, data) => {
            this.handleTopic(data.value);
          }}
        />
      );
    } else {
      topicInfo = (
        <Label.Group size="large" style={{ marginLeft: 20 }}>
          {this.props.item.topics.map((topic: types.Topic) => {
            return <Label key={topic.id}>{topic.name}</Label>;
          })}
        </Label.Group>
      );
    }
    if (this.state.modify) {
      systemInfo = (
        <Dropdown
          placeholder="System"
          style={{ marginLeft: 20, heigth: 10 }}
          defaultValue={this.state.chosenSystem}
          selection
          options={this.props.systems}
          onChange={(event, data) => {
            this.handleSystem(data.value);
          }}
        />
      );
    } else {
      systemInfo = (
        <Label.Group size="large" style={{ marginLeft: 20 }}>
          <Label>{this.props.item.system.name}</Label>
        </Label.Group>
      );
    }
    if (this.state.modify) {
      buttons = (
        <div>
          <Button
            basic
            style={{ marginLeft: 20 }}
            color="red"
            content="Cancel"
            onClick={() => {
              this.cancelModify();
            }}
          />
          <Button
            basic
            style={{ marginLeft: 20 }}
            color="green"
            content="Save Image"
            disabled={this.state.disabledSaveButton}
            onClick={() => {
              this.saveImage(event, this.props.item.id);
            }}
          />
        </div>
      );
    } else {
      buttons = (
        <div>
          <Button
            basic
            style={{ marginLeft: 20 }}
            color="red"
            content="Delete Image"
            onClick={() => {
              this.deleteImage(this.props.item.id);
            }}
          />
          <Button
            basic
            style={{ marginLeft: 20 }}
            color="orange"
            content="Modify Image"
            onClick={() => {
              this.modifyImage();
            }}
          />
        </div>
      );
    }
    if (this.props.isLoggedIn) {
      return (
        <Segment pilled="true">
          <List.Item>
            <List.Content>
              <List.Header>
                <Image
                  style={{ marginLeft: 20 }}
                  src={this.props.item.data_url}
                  size="small"
                />
                <div style={{ marginTop: 40, marginBottom: 50 }}>
                  <div style={{ marginBottom: 20 }}>
                    <label>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 400,
                          marginLeft: 20,
                          fontStyle: "sans"
                        }}
                      >
                        Topics added to image:
                      </span>
                      <br />
                      {topicInfo}
                    </label>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <label>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 400,
                          marginLeft: 20,
                          fontStyle: "sans"
                        }}
                      >
                        System that image belongs to:
                      </span>
                      <br />
                      {systemInfo}
                    </label>
                  </div>
                </div>

                {buttons}
              </List.Header>
              <List.Description />
            </List.Content>
          </List.Item>
        </Segment>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(ImageRow);
