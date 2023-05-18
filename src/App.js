import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap.css';
// TODO: Note: Replace ^[theme]^ (examples: materia, darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)
// https://www.npmjs.com/package/react-bootstrap-theme-switcher
// import 'bootswatch/dist/litera/bootstrap.min.css';
import withTracker from './Components/lib/withTracker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactGA from 'react-ga';

const TranscriptView = lazy(() => import('./Components/Transcripts/TranscriptView.js'));

const NoMatch = () => {
  return <>
    <h1>There was an error loading the page you requested.</h1>
    <p><Link to="/">Return to Budget Watcher</Link>.</p>
  </>;
};

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(process.env.REACT_APP_GA, {gaOptions: {
      cookie_domain: 'open-hac-budget-tool.github.io',
      cookie_flags: 'SameSite=None;Secure',
    }});
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.state = {
      transcriptJson: null,
    };
  }
  // TODO: remove unused rootes

  // eslint-disable-next-line class-methods-use-this
  render() {

    return (
      <>
        <HashRouter>
          <Suspense
            fallback={
              <Container>
                <br />
                <Row>
                  <Skeleton variant="rect" width={'100%'} height={50} />
                </Row>
                <br />
                <Row>
                  <Skeleton variant="rect" width={'100%'} height={600} />
                </Row>
              </Container>
            }
          >
            <Switch>
              <Route exact path="/" component={TranscriptView} />
              <Route exact path="/fy22/:transcriptId" component={TranscriptView} />
              <Route exact path="/fy23/:transcriptId" component={TranscriptView} />
              <Route exact path="/fy24/:transcriptId" component={TranscriptView} />
              <Route exact path="/city-council-2023/:transcriptId" component={TranscriptView} />
              <Route component={NoMatch} />
            </Switch>
          </Suspense>
        </HashRouter>
      </>
    );
  }
}

export default App;
