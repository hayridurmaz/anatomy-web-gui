import * as React from "react";
import AnswerInput from "./AnswerInput";
import { Input, Dropdown, Button, Label, Grid, Segment, Image, Tab, Popup as PopupS } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import * as types from "../store/types";
import ReactPlayer from "react-player";
import MediaPopupItem from "./MediaPopupItem";
 

interface IProps {
  openModal: boolean;
  setModal: (control: boolean) => any
  media: types.Media[];
}

export default class MediaPopup extends React.Component<IProps> {
  questionElements = [];
  state = {
    images: [] as types.Media[],
    videos: [] as types.Media[],
    dataValid: false as boolean,
    imageGrid: {} as JSX.Element,
    videoGrid: {} as JSX.Element,
    chosenMedia: -100 as number,
  };

  componentWillReceiveProps(nextProps: IProps) {

  }



  componentWillMount = () => {
    let Images = []
    let Videos = []
    this.props.media.forEach((item) => {
      if (String(item.mediaType) === types.mediaTypes[0]) {
        Images.push(item)
      } else if (String(item.mediaType) === types.mediaTypes[1]) {
        Videos.push(item)
      }
    })
    this.setState({ images: Images, videos: Videos }, () => { this.renderImageTab(); this.renderVideoTab(); })
  }

  componentDidMount = () => {

  }

  setChosenMediaIndex = (index : number) => {
    this.setState({chosenMedia: index}, () => {console.log(this.state.chosenMedia)})
  }

  renderImageTab = () => {
    let numOfRows = this.state.images.length / 2
    let rows = []

    let j = 1
    for (let i = 0; i <= numOfRows; i++) {
      let columns = []
      for (; j % 4 != 0 && j - 1 < this.state.images.length; j++) {
        columns.push(
          <Grid.Column>
            <MediaPopupItem
              media={this.state.images[j - 1]}
              index={j}
              setChosenMediaIndex={this.setChosenMediaIndex}
              isChosen={this.state.chosenMedia === j}
              dummyProp={this.state.chosenMedia}
            />
          </Grid.Column>
        )
      }
      rows.push(<Grid.Row>{columns}</Grid.Row>)
    }
    let grid = (<Grid columns={2} divided>
      {rows}
    </Grid>)
    this.setState({ imageGrid: grid })
  }

  renderVideoTab = () => {
    let numOfRows = this.state.videos.length / 2 //change 2 to change column number
    let rows = []

    let j = 1
    for (let i = 0; i <= numOfRows; i++) {
      let columns = []
      for (; j % 4 != 0 && j - 1 < this.state.videos.length; j++) {
        columns.push(
          <Grid.Column>
            <ReactPlayer
              url={this.state.videos[j - 1].data_url}
              //playing
              controls
              width={100}
              height={100}
              style={{ height: 50, width: 50 }}
            />
          </Grid.Column>
        )
      }
      rows.push(<Grid.Row>{columns}</Grid.Row>)
    }
    //change 2 to change column number
    let grid = (<Grid columns={2} divided>
      {rows}
    </Grid>)
    this.setState({ videoGrid: grid })
  }


  render() {
    const panes = [
      { menuItem: 'Images', render:() => <Tab.Pane>{this.state.imageGrid}</Tab.Pane> },//if renderActiveOnly prop is false then use pane if not use render fucntion and provide components as function
      { menuItem: 'Videos', render: () =><Tab.Pane>{this.state.videoGrid}</Tab.Pane> },
    ]
    return (
      <Popup open={this.props.openModal} modal>

        <div className="modal">
          <a className="close" onClick={() => { this.props.setModal(false); }}>
            &times;
        </a>
          <div className="header"> Available Medias </div>
          <div className="content" style={{ height: 400 }} >
            <Tab panes={panes} renderActiveOnly={true} />
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => { this.props.setModal(false); }}
            >
              close modal
                </button>
          </div>
        </div>

      </Popup>
    );
  }
}
