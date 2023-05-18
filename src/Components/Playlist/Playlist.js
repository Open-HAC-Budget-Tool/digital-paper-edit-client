import React from "react";
import ApiWrapper from "../../ApiWrapper/index.js";
import List from "../lib/List";
import { HashRouter } from "react-router-dom";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ListGroup from "react-bootstrap/ListGroup";
import SimpleItem from "../lib/SimpleListItem";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isNewItemModalShow: false,
      title: "",
      description: "",
      itemId: null,
      filter: 'All',
    };
  }

  showLinkPath = (id) => {
    if (id.includes('FY_2024')) {
      return `/fy24/${id}`
    }
    if (id.includes('FY_2023')) {
      return `/fy23/${id}`
    }
    if (id.includes('Council')) {
      return `/city-council-2023/${id}`
    }
    return `/fy22/${id}`
  };

  render() {
    return (
      <>
        <HashRouter>
          <ListGroup
            style={{ height: "50vh", overflowY: "scroll" }}
            // variant="flush"
          >
            {this.props.items.filter((item) => {
              if (this.props.filter === 'All') {
                return true
              }

              if (this.props.filter === 'City Council') {
                return item.collection === "2023 City Council Meetings"
              }

              if (this.props.filter === 'FY24 Budget Workshops') {
                return item.collection === "2023 Budget Workshops for FY2024"
              }

              if (this.props.filter === 'FY23 Budget Workshops') {
                return item.collection === "2022 Budget Workshops for FY2023"
              }

              if (this.props.filter === 'FY22 Budget Workshops') {
                return item.collection === "2021 Budget Workshops for FY2022"
              }
              
              return true
            }).map((item) => (
              <SimpleItem
                key={item.id}
                id={item.id}
                slug={item.slug}
                title={item.title}
                presentation={item.presentation}
                proposal={item.proposal}
                agenda={item.agenda}
                original={item.original}
                description={item.description}
                showLinkPath={this.showLinkPath}
              />
            ))}
          </ListGroup>
        </HashRouter>
      </>
    );
  }
}

export default Playlist;
