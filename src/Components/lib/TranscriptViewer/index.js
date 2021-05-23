import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes, { string } from 'prop-types';
import path from 'path';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import BFormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Replay10Icon from '@material-ui/icons/Replay10';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { createEditor, Editor, Transforms } from 'slate';

import {
useLocation, useHistory
} from "react-router-dom";

// https://docs.slatejs.org/walkthroughs/01-installing-slate
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import SideBtns from './SideBtns';
import { shortTimecode } from 'slate-transcript-editor/util/timecode-converter';
import download from 'slate-transcript-editor/util/downlaod/index.js';
import convertDpeToSlate from 'slate-transcript-editor/util/dpe-to-slate';
// TODO: This should be moved in export utils
import insertTimecodesInLineInSlateJs from 'slate-transcript-editor/util/insert-timecodes-in-line-in-words-list';
import pluck from 'slate-transcript-editor/util/pluk';
import plainTextalignToSlateJs from 'slate-transcript-editor/util/export-adapters/slate-to-dpe/update-timestamps/plain-text-align-to-slate';
import updateBloocksTimestamps from 'slate-transcript-editor/util/export-adapters/slate-to-dpe/update-timestamps/update-bloocks-timestamps';
import exportAdapter, { isCaptionType } from 'slate-transcript-editor/util/export-adapters';
import generatePreviousTimingsUpToCurrent from 'slate-transcript-editor/util/dpe-to-slate/generate-previous-timings-up-to-current';
import SlateHelpers from 'slate-transcript-editor/components/slate-helpers';

const PLAYBACK_RATE_VALUES = [0.2, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5];
const SEEK_BACK_SEC = 10;
const PAUSE_WHILTE_TYPING_TIMEOUT_MILLISECONDS = 1500;
// const MAX_DURATION_FOR_PERFORMANCE_OPTIMIZATION_IN_SECONDS = 3600;
const REPLACE_WHOLE_TEXT_INSTRUCTION =
  'Replace whole text. \n\nAdvanced feature, if you already have an accurate transcription for the whole text, and you want to restore timecodes for it, you can use this to replace the text in this transcript. \n\nFor now this is an experimental feature. \n\nIt expects plain text, with paragraph breaks as new line breaks but no speakers.';

const mediaRef = React.createRef();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const pauseWhileTypeing = (current) => {
  current.play();
};
const debouncePauseWhileTyping = debounce(pauseWhileTypeing, PAUSE_WHILTE_TYPING_TIMEOUT_MILLISECONDS);

function SlateTranscriptEditor(props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState([]);
  const defaultShowSpeakersPreference = typeof props.showSpeakers === 'boolean' ? props.showSpeakers : true;
  const defaultShowTimecodesPreference = typeof props.showTimecodes === 'boolean' ? props.showTimecodes : true;
  const [showSpeakers, setShowSpeakers] = useState(defaultShowSpeakersPreference);
  const [showTimecodes, setShowTimecodes] = useState(defaultShowTimecodesPreference);
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [showSpeakersCheatShet, setShowSpeakersCheatShet] = useState(false);
  const [saveTimer, setSaveTimer] = useState(null);
  const [isPauseWhiletyping, setIsPauseWhiletyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // used isContentModified to avoid unecessarily run alignment if the slate value contnet has not been modified by the user since
  // last save or alignment
  const [isContentModified, setIsContentIsModified] = useState(false);
  const [isContentSaved, setIsContentSaved] = useState(true);
  const [isEditable, setIsEditable] = useState(props.isEditable, []);
  let query = useQuery();
  
  useEffect(() => {
    if (isProcessing) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [isProcessing]);

  useEffect(() => {
    if (props.transcriptData) {
      const res = convertDpeToSlate(props.transcriptData);
      setValue(res);
    }
  }, [props.transcriptData]);

  useEffect(() => {
    const getUniqueSpeakers = pluck('speaker');
    const uniqueSpeakers = getUniqueSpeakers(value);
    setSpeakerOptions(uniqueSpeakers);
  }, [value]);

  //  useEffect(() => {
  //    const getUniqueSpeakers = pluck('speaker');
  //    const uniqueSpeakers = getUniqueSpeakers(value);
  //    setSpeakerOptions(uniqueSpeakers);
  //  }, [showSpeakersCheatShet]);

  useEffect(() => {
    // Update the document title using the browser API
    if (mediaRef && mediaRef.current) {
      // setDuration(mediaRef.current.duration);
      mediaRef.current.addEventListener('timeupdate', handleTimeUpdated);
      if (query.get('ts')) {
        mediaRef.current.currentTime = query.get('ts')
      }
    }
    return function cleanup() {
      // removeEventListener
      mediaRef.current.removeEventListener('timeupdate', handleTimeUpdated);
    };
  }, []);

  useEffect(() => {}, [currentTime]);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   if (mediaRef && mediaRef.current) {
  //     // Not working
  //     setDuration(mediaRef.current.duration);
  //     if (mediaRef.current.duration >= MAX_DURATION_FOR_PERFORMANCE_OPTIMIZATION_IN_SECONDS) {
  //       setShowSpeakers(false);
  //       showTimecodes(false);
  //     }
  //   }
  // }, [mediaRef]);

  const getSlateContent = () => {
    return value;
  };

  const getFileName = () => {
    return path.basename(props.mediaUrl).trim();
  };
  const getFileTitle = () => {
    if (props.title) {
      return props.title;
    }
    return getFileName();
  };

  const getShareURL = (ts) => {
    let currentPath = new URL(window.location.toString())
    currentPath.search = ''
    return `${currentPath.toString()}?ts=${ts}`
  }

  const handleTimeUpdated = (e) => {
    console.log('handle time updated', e.target.currentTime)
    setCurrentTime(e.target.currentTime);
    // TODO: setting duration here as a workaround
    setDuration(mediaRef.current.duration);
    //  TODO: commenting this out for now, not sure if it will fire to often?
    // if (props.handleAnalyticsEvents) {
    //   // handles if click cancel and doesn't set speaker name
    //   props.handleTimeUpdated('ste_handle_time_update', {
    //     fn: 'handleTimeUpdated',
    //     duration: mediaRef.current.duration,
    //     currentTime: e.target.currentTime,
    //   });
    // }
  };

  const handleSetPlaybackRate = (e) => {
    const previousPlaybackRate = playbackRate;
    const n = e.target.value;
    const tmpNewPlaybackRateValue = parseFloat(n);
    if (mediaRef && mediaRef.current) {
      mediaRef.current.playbackRate = tmpNewPlaybackRateValue;
      setPlaybackRate(tmpNewPlaybackRateValue);

      if (props.handleAnalyticsEvents) {
        props.handleAnalyticsEvents('ste_handle_set_playback_rate', {
          fn: 'handleSetPlaybackRate',
          previousPlaybackRate,
          newPlaybackRate: tmpNewPlaybackRateValue,
        });
      }
    }
  };

  const handleSeekBack = () => {
    if (mediaRef && mediaRef.current) {
      const newCurrentTime = mediaRef.current.currentTime - SEEK_BACK_SEC;
      mediaRef.current.currentTime = newCurrentTime;

      if (props.handleAnalyticsEvents) {
        props.handleAnalyticsEvents('ste_handle_seek_back', {
          fn: 'handleSeekBack',
          newCurrentTimeInSeconds: newCurrentTime,
          seekBackValue: SEEK_BACK_SEC,
        });
      }
    }
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'timedText':
        return <TimedTextElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    return (
      <span
        onDoubleClick={handleTimedTextClick}
        className={'timecode text'}
        data-start={children.props.parent.start}
        data-previous-timings={children.props.parent.previousTimings}
        // title={'double click on a word to jump to the corresponding point in the media'}
        {...attributes}
      >
        {children}
      </span>
    );
  }, []);

  //

  /**
   * `handleSetSpeakerName` is outside of TimedTextElement
   * to improve the overall performance of the editor,
   * especially on long transcripts
   * @param {*} element - props.element, from `renderElement` function
   */
  const handleSetSpeakerName = (element) => {
    const pathToCurrentNode = ReactEditor.findPath(editor, element);
    const oldSpeakerName = element.speaker;
    
  };

  const TimedTextElement = (props) => {
    let textLg = 12;
    let textXl = 12;
    if (!showSpeakers && !showTimecodes) {
      textLg = 12;
      textXl = 12;
    } else if (showSpeakers && !showTimecodes) {
      textLg = 9;
      textXl = 9;
    } else if (!showSpeakers && showTimecodes) {
      textLg = 9;
      textXl = 10;
    } else if (showSpeakers && showTimecodes) {
      textLg = 6;
      textXl = 7;
    }

    return (
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" {...props.attributes}>
        {showTimecodes && (
          <Grid item contentEditable={false} xs={4} sm={2} md={4} lg={2} xl={2} className={'p-t-2 text-truncate'}>
            <code
              contentEditable={false}
              style={{ cursor: 'pointer' }}
              className={'timecode text-muted unselectable'}
              onClick={handleTimedTextClick}
              // onClick={(e) => {
              //   e.preventDefault();
              // }}
              onDoubleClick={handleTimedTextClick}
              title={props.element.startTimecode}
              data-start={props.element.start}
            >
              {props.element.startTimecode}
            </code>
          </Grid>
        )}
        {showSpeakers && (
          <Grid item contentEditable={false} xs={8} sm={10} md={8} lg={3} xl={3} className={'p-t-2 text-truncate'}>
            <Typography
              noWrap
              contentEditable={false}
              className={'text-truncate text-muted unselectable'}
              style={{
                cursor: 'pointer',
                width: '100%',
                textTransform: 'uppercase',
              }}
              // title={props.element.speaker.toUpperCase()}
              title={props.element.speaker}
              onClick={handleSetSpeakerName.bind(this, props.element)}
            >
              {props.element.speaker}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={textLg} xl={textXl} className={'p-b-1 mx-auto'}>
          {props.children}
        </Grid>
      </Grid>
    );
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const handleTimedTextClick = (e) => {
    if (e.target.classList.contains('timecode')) {
      const start = e.target.dataset.start;
      if (mediaRef && mediaRef.current) {
        mediaRef.current.currentTime = parseFloat(start);
        mediaRef.current.play();

        if (props.handleAnalyticsEvents) {
          // handles if click cancel and doesn't set speaker name
          props.handleAnalyticsEvents('ste_handle_timed_text_click', {
            fn: 'handleTimedTextClick',
            clickOrigin: 'timecode',
            timeInSeconds: mediaRef.current.currentTime,
          });
        }
      }
    } else if (e.target.dataset.slateString) {
      if (e.target.parentNode.dataset.start) {
        const { startWord } = SlateHelpers.getSelectionNodes(editor, editor.selection);
        if (mediaRef && mediaRef.current && startWord && startWord.start) {
          mediaRef.current.currentTime = parseFloat(startWord.start);
          mediaRef.current.play();

          if (props.handleAnalyticsEvents) {
            // handles if click cancel and doesn't set speaker name
            props.handleAnalyticsEvents('ste_handle_timed_text_click', {
              fn: 'handleTimedTextClick',
              clickOrigin: 'word',
              timeInSeconds: mediaRef.current.currentTime,
            });
          }
        } else {
          // fallback in case there's some misalignment with the words
          // use the start of paragraph instead
          const start = parseFloat(e.target.parentNode.dataset.start);
          if (mediaRef && mediaRef.current && start) {
            mediaRef.current.currentTime = parseFloat(start);
            mediaRef.current.play();

            if (props.handleAnalyticsEvents) {
              // handles if click cancel and doesn't set speaker name
              props.handleAnalyticsEvents('ste_handle_timed_text_click', {
                fn: 'handleTimedTextClick',
                origin: 'paragraph-fallback',
                timeInSeconds: mediaRef.current.currentTime,
              });
            }
          }
        }
      }
    }
  };

  const handleSetEditable = () => {
    setIsEditable(!isEditable)
  }

  // TODO: refacto this function, to be cleaner and easier to follow.
  const handleRestoreTimecodes = async (inlineTimecodes = false) => {
    // if nothing as changed and you don't need to modify the data
    // to get inline timecodes, then just return as is
    if (!isContentModified && !inlineTimecodes) {
      return value;
    }
    // only used by Word (OHMS) export
    const alignedSlateData = await updateBloocksTimestamps(value, inlineTimecodes);
    setValue(alignedSlateData);
    setIsContentIsModified(false);

    if (inlineTimecodes) {
      // we don't want to show the inline timecode in the editor, but we want to return them to export function
      const alignedSlateDataWithInlineTimecodes = insertTimecodesInLineInSlateJs(alignedSlateData);
      return alignedSlateDataWithInlineTimecodes;
    }

    return alignedSlateData;
  };

  // TODO: this could be refactore, and brought some of this logic inside the exportAdapter (?)
  // To make this a little cleaner
  const handleExport = async ({ type, ext, speakers, timecodes, inlineTimecodes, hideTitle, atlasFormat, isDownload }) => {
    if (props.handleAnalyticsEvents) {
      // handles if click cancel and doesn't set speaker name
      props.handleAnalyticsEvents('ste_handle_export', {
        fn: 'handleExport',
        type,
        ext,
        speakers,
        timecodes,
        inlineTimecodes,
        hideTitle,
        atlasFormat,
        isDownload,
      });
    }

    try {
      setIsProcessing(true);
      let tmpValue = getSlateContent();
      if (timecodes) {
        tmpValue = await handleRestoreTimecodes();
      }

      if (inlineTimecodes) {
        tmpValue = await handleRestoreTimecodes(inlineTimecodes);
      }

      if (isContentModified && type === 'json-slate') {
        tmpValue = await handleRestoreTimecodes();
      }

      if (isContentModified && type === 'json-digitalpaperedit') {
        tmpValue = await handleRestoreTimecodes();
      }

      if (isContentModified && isCaptionType(type)) {
        tmpValue = await handleRestoreTimecodes();
      }
      // export adapter does not doo any alignment
      // just converts between formats
      let editorContnet = exportAdapter({
        slateValue: tmpValue,
        type,
        transcriptTitle: getFileTitle(),
        speakers,
        timecodes,
        inlineTimecodes,
        hideTitle,
        atlasFormat,
      });

      if (ext === 'json') {
        editorContnet = JSON.stringify(editorContnet, null, 2);
      }
      if (ext !== 'docx' && isDownload) {
        download(editorContnet, `${getFileTitle()}.${ext}`);
      }
      return editorContnet;
    } finally {
      setIsProcessing(false);
    }
  };

  // const debounced_version = throttle(handleRestoreTimecodes, 3000, { leading: false, trailing: true });
  // TODO: revisit logic for
  // - splitting paragraph via enter key
  // - merging paragraph via delete
  // - merging paragraphs via deleting across paragraphs
  const handleOnKeyDown = async (event) => {
    if (!isEditable) {
      event.preventDefault();
      return
    }

    setIsContentIsModified(true);
    setIsContentSaved(false);
    //  ArrowRight ArrowLeft ArrowUp ArrowUp
    if (event.key === 'Enter') {
      // intercept Enter, and handle timecodes when splitting a paragraph
      event.preventDefault();
      // console.info('For now disabling enter key to split a paragraph, while figuring out the aligment issue');
      // handleSetPauseWhileTyping();
      // TODO: Edge case, hit enters after having typed some other words?
      const isSuccess = SlateHelpers.handleSplitParagraph(editor);
      if (props.handleAnalyticsEvents) {
        // handles if click cancel and doesn't set speaker name
        props.handleAnalyticsEvents('ste_handle_split_paragraph', {
          fn: 'handleSplitParagraph',
          isSuccess,
        });
      }
      if (isSuccess) {
        // as part of splitting paragraphs there's an alignement step
        // so content is not counted as modified
        setIsContentIsModified(false);
      }
    }
    if (event.key === 'Backspace') {
      const isSuccess = SlateHelpers.handleDeleteInParagraph({ editor, event });
      // Commenting that out for now, as it might get called too often
      // if (props.handleAnalyticsEvents) {
      //   // handles if click cancel and doesn't set speaker name
      //   props.handleAnalyticsEvents('ste_handle_delete_paragraph', {
      //     fn: 'handleDeleteInParagraph',
      //     isSuccess,
      //   });
      // }
      if (isSuccess) {
        // as part of splitting paragraphs there's an alignement step
        // so content is not counted as modified
        setIsContentIsModified(false);
      }
    }
    // if (event.key.length == 1 && ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 49 && event.keyCode <= 57))) {
    //   const alignedSlateData = await debouncedSave(value);
    //   setValue(alignedSlateData);
    //   setIsContentIsModified(false);
    // }

    if (isPauseWhiletyping) {
      // logic for pause while typing
      // https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
      // TODO: currently eve the video was paused, and pause while typing is on,
      // it will play it when stopped typing. so added btn to turn feature on off.
      // and disabled as default.
      // also pause while typing might introduce performance issues on longer transcripts
      // if on every keystroke it's creating and destroing a timer.
      // should find a more efficient way to "debounce" or "throttle" this functionality
      if (mediaRef && mediaRef.current && !mediaRef.current.paused) {
        mediaRef.current.pause();
        debouncePauseWhileTyping(mediaRef.current);
      }
    }
    // auto align when not typing
  };

  return (
    <div style={{ paddingTop: '1em' }}>
      <CssBaseline />
      <Container>
        <Paper elevation={3} />
        <style scoped>
          {`/* Next words */
             .timecode[data-previous-timings*="${generatePreviousTimingsUpToCurrent(currentTime)}"]{
                  color:  #9E9E9E;
              }
              // NOTE: The CSS is here, coz if you put it as a separate index.css the current webpack does not bundle it with the component
              /* TODO: Temporary, need to scope this to the component in a sensible way */
              .editor-wrapper-container {
                font-family: Roboto, sans-serif;
              }
              .editor-wrapper-container {
                padding: 8px 16px;
                height: 90vh;
                overflow: auto;
              }
              /* https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
              TODO: only working in Chrome, not working in Firefox, and Safari - OSX
              if selecting text, not showing selection
              Commented out because it means cannot select speakers and timecode anymore
              which is the intended default behavior but needs to come with export
              functionality to export as plain text, word etc.. otherwise user won't be able
              to get text out of component with timecodes and speaker names in the interim */
              .unselectable {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
              .timecode:hover {
                text-decoration: underline;
              }
              .timecode.text:hover {
                text-decoration: none;
              }
          `}
        </style>
        {props.showTitle && (
          <Tooltip title={props.title}>
            <Typography variant="h5" noWrap>
              {props.title}
            </Typography>
          </Tooltip>
        )}

        <Grid container direction="row" justify="space-around" alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Grid container direction="column" justify="space-between" alignItems="flex-start">
            {props.mediaUrl && (
              <>
              <Grid item style={{ backgroundColor: 'black' }}>
                <video ref={mediaRef} src={props.mediaUrl} width={'100%'} height="auto" controls playsInline></video>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                  <Grid item>
                    <p>
                      <code style={{ color: 'grey' }}>{shortTimecode(currentTime)}</code>
                      <span style={{ color: 'grey' }}> {` | `}</span>
                      <code style={{ color: 'grey' }}>{duration ? `${shortTimecode(duration)}` : '00:00:00'}</code>
                    </p>
                  </Grid>

                  <Grid item>
                    <Tooltip title={`Seek back by ${SEEK_BACK_SEC} seconds`}>
                      <Button color="primary" onClick={handleSeekBack} block="true">
                        <Replay10Icon color="primary" />
                      </Button>
                    </Tooltip>
                    {/* </OverlayTrigger> */}
                  </Grid>
                  <Grid item>
                    <FormControl>
                      {/* <InputLabel id="demo-simple-select-label">Speed</InputLabel> */}
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={playbackRate} onChange={handleSetPlaybackRate}>
                        {PLAYBACK_RATE_VALUES.map((playbackRateValue, index) => {
                          return (
                            <MenuItem key={index + playbackRateValue} value={playbackRateValue}>
                              {' '}
                              x {playbackRateValue}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {/* <FormHelperText>Speed</FormHelperText> */}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{width: '100%'}}>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">Link at time</InputGroup.Text>
                  </InputGroup.Prepend>
                  <BFormControl aria-label="Share URL @ time" aria-describedby="inputGroup-sizing-sm" readOnly value={getShareURL(currentTime)}/>
                </InputGroup>
              </Grid>
              <Grid item>
                <Link
                  color="inherit"
                  onClick={() => {
                    setShowSpeakersCheatShet(!showSpeakersCheatShet);
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Speakers
                  </Typography>
                </Link>

                <Collapse in={showSpeakersCheatShet}>
                  {speakerOptions.map((speakerName, index) => {
                    return (
                      <Typography
                        variant="body2"
                        gutterBottom
                        key={index + speakerName}
                        className={'text-truncate'}
                        title={speakerName.toUpperCase()}
                      >
                        {speakerName}
                      </Typography>
                    );
                  })}
                </Collapse>
              </Grid>
              </>)}
              <Grid item>{props.children}</Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
            {value.length !== 0 ? (
              <>
                <Paper elevation={3}>
                  <section className="editor-wrapper-container">
                    <Slate
                      editor={editor}
                      value={value}
                      onChange={(value) => {
                        if (props.handleAutoSaveChanges) {
                          props.handleAutoSaveChanges(value);
                          setIsContentSaved(true);
                        }
                        return setValue(value);
                      }}
                    >
                      <Editable
                        // readOnly={typeof isEditable === 'boolean' ? !isEditable : false}
                        readOnly={false}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={handleOnKeyDown}
                      />
                    </Slate>
                  </section>
                </Paper>
              </>
            ) : (
              <section className="text-center">
                <i className="text-center">Pick a workshop to get started...</i>
              </section>
            )}
          </Grid>

          <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
            <SideBtns
              handleExport={handleExport}
              isEditable={isEditable}
              handleSetEditable={handleSetEditable}
              isProcessing={isProcessing}
              isContentModified={isContentModified}
              isContentSaved={isContentSaved}
              setIsProcessing={setIsProcessing}
              optionalBtns={props.optionalBtns}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SlateTranscriptEditor;

SlateTranscriptEditor.propTypes = {
  transcriptData: PropTypes.object,
  mediaUrl: PropTypes.string,
  handleSaveEditor: PropTypes.func,
  handleAutoSaveChanges: PropTypes.func,
  autoSaveContentType: PropTypes.string,
  isEditable: PropTypes.bool,
  showTimecodes: PropTypes.bool,
  showSpeakers: PropTypes.bool,
  title: PropTypes.string,
  showTitle: PropTypes.bool,
};

SlateTranscriptEditor.defaultProps = {
  showTitle: false,
  showTimecodes: true,
  showSpeakers: true,
  autoSaveContentType: 'digitalpaperedit',
  isEditable: true,
};