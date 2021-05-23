import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class SimpleItem extends Component {
  showLinkPath = () => {
    return this.props.showLinkPath(this.props.slug);
  };

  render() {
    return (
      <LinkContainer to={this.showLinkPath()} style={{ cursor: 'pointer' }}>
        <ListGroup.Item action>
          {this.props.title}
        </ListGroup.Item>
      </LinkContainer>
    );
  }
}

export default SimpleItem;
