import React, { Component, Suspense } from "react";
import path from "path";
// import './index.module.css';
// import styles from './Transcript.module.css';
// TODO: perhaps import TranscriptViewer on componentDidMount(?) to defer the load for later
// https://facebook.github.io/create-react-app/docs/code-splitting
// import TranscriptViewer from 'slate-transcript-editor';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ApiWrapper from "../../ApiWrapper/index.js";
import Skeleton from "@material-ui/lab/Skeleton";
import { Redirect } from "react-router-dom";

import items from "../../playlist.json";
import Playlist from "../Playlist/Playlist.js";

const TranscriptViewer = React.lazy(() => import("../lib/TranscriptViewer"));

const projectId = null;

const playlistItems = items.reverse();

class TranscriptView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcriptId: this.props.match.params.transcriptId,
      transcriptJson: null,
      url: null,
      projectTitle: "",
      transcriptTitle: "",
      savedNotification: null,
      status: null,
    };
    this.transcriptViewerRef = React.createRef();
  }

  componentDidMount = () => {
    this.updateTranscript();
  };

  componentDidUpdate = () => {
    if (this.props.match.params.transcriptId === this.state.transcriptId) {
      return;
    }
    this.setState({
      transcriptId: this.props.match.params.transcriptId,
    });
    this.updateTranscript(this.props.match.params.transcriptId);
  };

  updateTranscript = (transcriptId) => {
    if (!(transcriptId || this.state.transcriptId)) {
      return;
    }
    this.setState({
      status: "Loading",
    });
    ApiWrapper.getTranscript(projectId, transcriptId || this.state.transcriptId)
      // TODO: add error handling
      .then((json) => {
        if (json.status && json.status === "Not Found") {
          this.setState({
            status: "Not Found",
            projectTitle: "",
            transcriptTitle: "",
            transcriptJson: null,
            url: null,
            clipName: null,
          });
        }

        this.setState({
          projectTitle: json.projectTitle,
          transcriptTitle: json.transcriptTitle,
          transcriptJson: json.transcript,
          url: json.url,
          clipName: json.clipName,
          status: "Found",
        });
      });
  };

  render() {
    // Workaround to change layout of TranscriptViewer for audio files.
    // For now only handling limited numnber of file extension that have more of a certainty of being audio
    // as opposed to more ambiguos extensions such as ogg or mp4 that could be either video or audio
    // there might be better ways to determine if a clip is audio or video, especially node/"server side" but
    // might also be more of a setup eg using ffprobe etc..
    let mediaType = "video";
    if (
      path.extname(this.state.clipName) === ".wav" ||
      path.extname(this.state.clipName) === ".mp3" ||
      path.extname(this.state.clipName) === ".m4a" ||
      path.extname(this.state.clipName) === ".flac" ||
      path.extname(this.state.clipName) === ".aiff"
    ) {
      mediaType = "audio";
    }
    return (
      <>
        <div class="navbar" bg="dark" variant="dark">
          <h1 class="navbar-title">#HouBudget FY22 Workshops Watcher</h1>
          {/* <Nav className="mr-auto"></Nav> */}
          {/* <Nav>
            <small className="text-light text-right">
              Transcripts <a href="https://www.assemblyai.com/" target="_blank">auto-generated</a>, then crowd-sourced.  <a href="https://bit.ly/datatodream-budget-transcripts" target="_blank">Submit corrections here</a>.<br/>
              <a href="https://github.com/Open-HAC-Budget-Tool/watcher" target="_blank">Code</a> is a fork of <a href="https://www.autoedit.io/" target="_blank">AutoEdit</a>.
            </small>
          </Nav> */}
        </div>
        <Container
          style={{
            backgroundColor: "#eee",
          }}
          fluid
        >
          {
            <Suspense
              fallback={
                <Container fluid>
                  <Row>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                      <Skeleton variant="rect" width={"100%"} height={100} />
                    </Col>
                    <Col xs={12} sm={7} md={7} lg={7} xl={7}>
                      <Skeleton variant="rect" width={"100%"} height={600} />
                    </Col>
                    <Col xs={12} sm={1} md={1} lg={1} xl={1}>
                      <Skeleton variant="rect" width={"100%"} height={350} />
                    </Col>
                  </Row>
                </Container>
              }
            >
              <TranscriptViewer
                transcriptData={this.state.transcriptJson} // Transcript json
                mediaUrl={this.state.url} // string url to media file - audio or video
                // showTitle={true}
                isEditable={false} // se to true if you want to be able to edit the text
                title={this.state.transcriptTitle}
                mediaType={mediaType}
                autoSaveContentType={"digitalpaperedit"}
                status={this.state.status}
              >
                <Playlist items={playlistItems} />
              </TranscriptViewer>
            </Suspense>
          }
        </Container>
      </>
    );
  }
}

export default TranscriptView;
