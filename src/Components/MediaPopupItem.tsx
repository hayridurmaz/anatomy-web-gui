import * as React from "react";
import AnswerInput from "./AnswerInput";
import { Input, Dropdown, Button, Label, Grid, Segment, Image, Tab, Popup as PopupS } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import * as types from "../store/types";
import ReactPlayer from "react-player";


interface IProps {
  media: types.Media;
  index: Number;
  isChosen: number;
  setChosenMediaIndex: (index: Number) => any;
}

export default class MediaPopupItem extends React.Component<IProps> {
  questionElements = [];
  state = {
    isChosen: false as boolean,
    buttonText: "Choose" as string
  };

  constructor(IProps) {
    super(IProps);
  }
  componentWillReceiveProps = (nextProps: IProps) => {
    console.log("hellooo")
    console.log(nextProps.isChosen)
    
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {

  }

  setStyleForButton = () => {
    if (this.props.isChosen === this.props.index) {
      this.setState({ buttonText: "chosen", isChosen: true })
    } else {
      this.setState({ buttonText: "Choose", isChosen: false })
    }
  }

  clickButton = () => {
    event.preventDefault()
    this.props.setChosenMediaIndex(this.props.index)

    console.log( "index" + this.props.index)
    console.log("chosenMedia" + this.props.isChosen)
  }

  render() {
    return (
      <div style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around' }} >
        <div>
          <Image width={50}
            height={50} src={this.props.media.data_url} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <PopupS
            trigger={<Button onClick={() => { event.preventDefault(); }} icon>Topics</Button>}
            content={<Label.Group size='large' style={{ marginLeft: 0 }} >
              {this.props.media.topics.map((topic) => {
                return (<Label>{topic.name}</Label>)
              })}
            </Label.Group>}
            on={['hover', 'click']}
            hideOnScroll
          />
        </div>

        <div>
          <PopupS
            trigger={<Button onClick={() => { event.preventDefault(); }} icon>System</Button>}
            content={<Label.Group size='large' style={{ marginLeft: 0 }} >
              <Label>{this.props.media.system.name}</Label>
            </Label.Group>}
            on={['hover', 'click']}
            hideOnScroll
          />
        </div>
        <div>
          <Button  style={{marginTop: 20}} positive={this.props.isChosen === this.props.index} onClick={() => { this.clickButton() }} >{this.state.buttonText}</Button>
        </div>
      </div>
    );
  }
}
