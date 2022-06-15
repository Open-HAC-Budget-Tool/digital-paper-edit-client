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
          {(this.props.presentation || this.props.proposal) && <div class='buttons'>
            {this.props.presentation && <button class='button' onClick={this.openPresentation}>Presentation</button>}
            {this.props.proposal && <button class='button' onClick={this.openProposal}>Proposal</button>}
          </div>}
        </ListGroup.Item>
      </LinkContainer>
    );
  }
}

export default SimpleItem;
