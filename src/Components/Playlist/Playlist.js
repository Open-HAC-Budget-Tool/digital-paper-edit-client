import React from 'react';
import ApiWrapper from '../../ApiWrapper/index.js';
import List from '../lib/List';
import { HashRouter } from 'react-router-dom';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ListGroup from 'react-bootstrap/ListGroup';
import SimpleItem from '../lib/SimpleListItem';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isNewItemModalShow: false,
      title: '',
      description: '',
      itemId: null,
    };
  }

  showLinkPath = id => {
    return `/transcripts/${id}`
  };

  render() {
    return (
      <>
        <HashRouter>
          <ListGroup 
          style={ { height: '50vh', overflow: 'scroll' } } 
          // variant="flush"
          >
            {this.props.items.map((item) => (
              <SimpleItem
                key={ item.id }
                id={ item.id }
                slug={ item.slug }
                title={ item.title }
                description={ item.description }
                showLinkPath={ this.showLinkPath }
              />
            ))}
          </ListGroup>
        </HashRouter>
      </>
    );
  }
}

export default Playlist;
