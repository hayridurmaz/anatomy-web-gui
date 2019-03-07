import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import { getDate } from "../utils/utils";
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
    Image
} from "semantic-ui-react";
import InlineEdit from "react-edit-inline";
import { format } from "path";
import { type } from "os";
var ProgressBar = require("react-progressbar").default;

interface IProps {
    item: types.Media;
    editItem: (item: types.System | types.Topic, newSystem: string) => {};
    deleteItem: (item: types.System | types.Topic) => {};
}
interface ReduxProps {
    isLoggedIn?: boolean;
}
class ImageRow extends React.Component<IProps & ReduxProps> {
    state = {
        editedStr: ""
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Segment pilled="true">
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Image style={{ marginLeft: 20 }} src={this.props.item.data_url} size='small' />
                                <div style={{ marginTop: 20 }} >
                                    <label>
                                        <span style={{ fontSize: 20, fontWeight: 400, marginLeft: 20, fontStyle: "sans" }} >Topics added to image:</span>
                                        <Label.Group size='large' style={{ marginLeft: 20 }} >
                                            {this.props.item.topics.map((topic: types.Topic) => {
                                                return (<Label>{topic.name}</Label>)
                                            })}
                                        </Label.Group>
                                    </label>
                                </div>
                                <div style={{ marginTop: 20 }} >
                                    <label>
                                        <span style={{ fontSize: 20, fontWeight: 400, marginLeft: 20, fontStyle: "sans" }} >System that image belongs to:</span>
                                        <Label.Group size='large' style={{ marginLeft: 20 }} >
                                            <Label>{this.props.item.system.name}</Label>
                                        </Label.Group>
                                    </label>
                                </div>
                                <Button basic style={{marginLeft: 20}} color='red' content='Delete Image'  />
                                <Icon
                                    style={{marginLeft: 20}}
                                    name="delete"
                                    inverted
                                    circular
                                    link
                                    onClick={() => {

                                    }}
                                />
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
