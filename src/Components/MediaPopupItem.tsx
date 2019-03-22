import * as React from "react";
import AnswerInput from "./AnswerInput";
import { Input, Dropdown, Button, Label, Icon, Segment, Image, Tab, Popup as PopupS } from 'semantic-ui-react'
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

  componentWillMount = () => {

  }

  componentDidMount = () => {

  }

  setTextForButton = (chosen: boolean) => {
    if (chosen) {
      return "Chosen"
    } else {
      return "Choose"
    }
  }

  clickButton = () => {
    event.preventDefault()
    this.props.setChosenMediaIndex(this.props.media.id)
  }

  render() {
    return (
      <div >
        <div className={"mediaItemImage"} >
          <Image width={50}
            height={50} src={this.props.media.data_url} />
        </div>

        <div className={"mediaItem"} style={{ marginLeft: "10px", marginTop: "10px" }} >
          <div style={{}}>
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
            <Button style={{}} positive={this.props.isChosen === this.props.index} onClick={() => { this.clickButton() }} >
              {this.setTextForButton(this.props.isChosen === this.props.index)}
            </Button>
          </div>
        </div>

      </div>
    );
  }
}
