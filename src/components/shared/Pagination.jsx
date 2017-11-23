import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationRB from 'react-bootstrap/lib/Pagination';
import './Pagination.css';

const noMargin = {
  margin: 0,
};

class Pagination extends Component {

  state = {
    activePage: this.props.activePage,
  }

  render() {
    return (
      <PaginationRB
        prev
        next
        ellipsis={false}
        items={this.props.numberOfPages}
        maxButtons={3}
        activePage={this.props.activePage}
        onSelect={this.props.handleSelect}
        style={noMargin}
      />
    );
  }

}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  handleSelect: PropTypes.func,
  numberOfPages: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  activePage: 1,
  handleSelect: () => {},
  numberOfPages: 3,
};

export default Pagination;
