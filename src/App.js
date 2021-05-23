import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, HashRouter, Link } from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap.css';
// TODO: Note: Replace ^[theme]^ (examples: materia, darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)
// https://www.npmjs.com/package/react-bootstrap-theme-switcher
// import 'bootswatch/dist/litera/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Skeleton from '@material-ui/lab/Skeleton';

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
              <Route component={NoMatch} />
            </Switch>
          </Suspense>
        </HashRouter>
      </>
    );
  }
}

export default App;
