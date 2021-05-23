import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class SimpleItem extends Component {
  showLinkPath = () => {
    return this.props.showLinkPath(this.props.slug);
  };

  openPresentation = () => {
    window.open(this.props.presentation)
  }

  openProposal = () => {
    window.open(this.props.proposal)
  }

  render() {
    return (
      <LinkContainer to={this.showLinkPath()} style={{ cursor: 'pointer' }}>
        <ListGroup.Item action>
          <h6>{this.props.title}</h6>
          {(this.props.presentation || this.props.proposal) && <ButtonGroup size="sm">
            {this.props.presentation && <Button variant="light" onClick={this.openPresentation}>Presentation</Button>}
            {this.props.proposal && <Button variant="light" onClick={this.openProposal}>Proposal</Button>}
          </ButtonGroup>}
        </ListGroup.Item>
      </LinkContainer>
    );
  }
}

export default SimpleItem;
