import * as React from "react";
import AnswerInput from "./AnswerInput";
import {
  Input,
  Dropdown,
  Button,
  Label,
  Grid,
  Segment,
  Image,
  Tab,
  Popup as PopupS
} from "semantic-ui-react";
import Popup from "reactjs-popup";
import * as types from "../store/types";
import ReactPlayer from "react-player";
import MediaPopupItem from "./MediaPopupItem";

interface IProps {
  openModal: boolean;
  setModal: (control: boolean) => any;
  media: types.Media[];
  setMediaIndex: (index: number) => any;
}

export default class MediaPopup extends React.Component<IProps> {
  questionElements = [];
  state = {
    images: [] as types.Media[],
    videos: [] as types.Media[],
    dataValid: false as boolean,
    imageGrid: {} as JSX.Element,
    videoGrid: {} as JSX.Element,
    chosenMedia: -100 as number
  };

  componentWillReceiveProps(nextProps: IProps) {}

  componentWillMount = () => {
    let Images = [];
    let Videos = [];
    this.props.media.forEach(item => {
      if (String(item.media_type) === types.media_types[0]) {
        Images.push(item);
      } else if (String(item.media_type) === types.media_types[1]) {
        Videos.push(item);
      }
    });
    this.setState({ images: Images, videos: Videos }, () => {
      this.renderImageTab();
      this.renderVideoTab();
    });
  };

  componentDidMount = () => {};

  setChosenMediaIndex = (index: number) => {
    this.setState({ chosenMedia: index }, () => {
      this.props.setMediaIndex(index);
    });
  };

  renderImageTab = () => {
    let numOfRows = this.state.images.length / 2; //change 2 to change column number
    let rows = [];

    let j = 1;
    for (let i = 0; i <= numOfRows; i++) {
      let columns = [];
      for (; j % 4 != 0 && j - 1 < this.state.images.length; j++) {
        columns.push(
          <Grid.Column key={Math.floor(Math.random() * 10000)}>
            <MediaPopupItem
              media={this.state.images[j - 1]}
              index={this.state.images[j - 1].id}
              setChosenMediaIndex={this.setChosenMediaIndex}
              isChosen={this.state.chosenMedia}
            />
          </Grid.Column>
        );
      }
      rows.push(
        <Grid.Row key={Math.floor(Math.random() * 10000)}>{columns}</Grid.Row>
      );
    }
    //change 2 to change column number
    return (
      <Grid columns={2} divided>
        {rows}
      </Grid>
    );
  };

  renderVideoTab = () => {
    let numOfRows = this.state.videos.length / 2; //change 2 to change column number
    let rows = [];

    let j = 1;
    for (let i = 0; i <= numOfRows; i++) {
      let columns = [];
      for (; j % 4 != 0 && j - 1 < this.state.videos.length; j++) {
        columns.push(
          <Grid.Column key={Math.floor(Math.random() * 10000)}>
            <ReactPlayer
              url={this.state.videos[j - 1].data_url}
              //playing
              controls
              width={100}
              height={100}
              style={{ height: 50, width: 50 }}
            />
          </Grid.Column>
        );
      }
      rows.push(
        <Grid.Row key={Math.floor(Math.random() * 10000)}>{columns}</Grid.Row>
      );
    }
    //change 2 to change column number
    return (
      <Grid columns={2} divided>
        {rows}
      </Grid>
    );
  };

  render() {
    const panes = [
      {
        menuItem: "Images",
        render: () => (
          <Tab.Pane attached={false}>{this.renderImageTab()}</Tab.Pane>
        )
      }, //if renderActiveOnly prop is false then use pane if not use render fucntion and provide components as function
      {
        menuItem: "Videos",
        render: () => (
          <Tab.Pane attached={false}>{this.renderVideoTab()}</Tab.Pane>
        )
      }
    ];
    return (
      <Popup
        onClose={() => {
          this.props.setModal(false);
        }}
        open={this.props.openModal}
        modal
      >
        <div className="modal">
          <a
            className="close"
            onClick={() => {
              this.props.setModal(false);
            }}
          >
            &times;
          </a>
          <div className="header"> Available Medias </div>
          <div className="content" style={{ height: 400 }}>
            <Tab
              menu={{ pointing: true }}
              panes={panes}
              renderActiveOnly={true}
            />
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                this.props.setModal(false);
              }}
            >
              close modal
            </button>
          </div>
        </div>
      </Popup>
    );
  }
}
