import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchTaxies } from '../../../actions/actions';

import MyTaxiFilter from './MyTaxiFilter';
import TaxiTable from './TaxiTable';
import Pagination from '../../shared/Pagination';
import GMap from '../../shared/GMap';

class MyTaxi extends Component {
  static propTypes = {
    taxies: PropTypes.shape({
      ids: PropTypes.array,
      content: PropTypes.shape({
        id: PropTypes.number,
        state: PropTypes.string,
        type: PropTypes.string,
        coordinate: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      }),
    }),
    onFetchTaxies: PropTypes.func,
  };

  static defaultProps = {
    taxies: [],
    onFetchTaxies: () => {},
  };

  state = {
    activePage: 1,
    resultsPerPage: 10,
    status: 'ACTIVE',
  };

  componentDidMount() {
    this.props.onFetchTaxies();
  }

  onStatusChange = (event) => {
    this.setState({
      status: event,
      activePage: 1,
    });
  }

  numberOfPages = 1;
  normalize = (taxiIds) => {
    const ids = [];
    const content = {};
    const markers = [];
    taxiIds.forEach((id) => {
      ids.push(id);
      content[id] = this.props.taxies.content[id];
      markers.push({
        position: {
          lat: this.props.taxies.content[id].coordinate.latitude,
          lng: this.props.taxies.content[id].coordinate.longitude,
        },
        key: id,
        defaultAnimation: 2,
        title: this.props.taxies.content[id].id.toString(),
      });
    });
    return {
      ids,
      content,
      markers,
    };
  }

  handleSelect = (event) => {
    this.setState({
      activePage: event,
    });
  }

  filterTaxies = a => (b) => {
    if (a === this.props.taxies.content[b].state) {
      return true;
    }
    return false;
  }

  paginate = (pageSize, pageNumber) => {
    --pageNumber; // because pages logically start with 1, but technically with 0
    const cars = this.props.taxies.ids.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    if (this.state.status === 'ACTIVE' || this.state.status === 'INACTIVE') {
      const goodCars = this.props.taxies.ids.filter(this.filterTaxies(this.state.status));
      this.numberOfPages = Math.ceil(goodCars.length / this.state.resultsPerPage);
      return goodCars.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }
    this.numberOfPages = Math.ceil(this.props.taxies.ids.length / this.state.resultsPerPage);
    return cars;
  }

  render() {
    const { activePage, resultsPerPage } = this.state;
    const results = this.normalize(this.paginate(resultsPerPage, activePage));
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <MyTaxiFilter onChange={this.onStatusChange} />
          <TaxiTable
            taxies={results}
          />
        </div>
        <div className="panel-footer">
          <Pagination
            numberOfPages={this.numberOfPages}
            activePage={activePage}
            handleSelect={this.handleSelect}
          />
        </div>
        <GMap markers={results.markers} defaultCenter={{ lat: 53.5431, lng: 10.0055 }} />
      </div>
    );
  }
}

const mapStateToProps = ({ taxies }) => ({
  taxies,
});

const mapDispatchtoProps = {
  onFetchTaxies: fetchTaxies,
};

export default connect(mapStateToProps, mapDispatchtoProps)(
  MyTaxi,
);
