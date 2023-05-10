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

  openAgenda = () => {
    window.open(this.props.agenda)
  }

  openOriginal = () => {
    window.open(this.props.original)
  }
  
  render() {
    return (
      <LinkContainer to={this.showLinkPath()} style={{ cursor: 'pointer' }}>
        <ListGroup.Item action>
          <h6>{this.props.title}</h6>
          {(this.props.presentation || this.props.proposal || this.props.agenda || this.props.original) && <div className='buttons'>
            {this.props.presentation && <button className='button' onClick={this.openPresentation}>Presentation</button>}
            {this.props.proposal && <button className='button' onClick={this.openProposal}>Proposal</button>}
            {this.props.agenda && <button className='button' onClick={this.openAgenda}>Agenda</button>}
            {this.props.original && <button className='button' onClick={this.openOriginal}>Original</button>}
          </div>}
        </ListGroup.Item>
      </LinkContainer>
    );
  }
}

export default SimpleItem;
