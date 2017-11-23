import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchCars2Go } from '../../../actions/actions';

import Car2GoFilter from './Car2GoFilter';
import Car2GoTable from './Car2GoTable';
import Pagination from '../../shared/Pagination';
import GMap from '../../shared/GMap';

class Car2Go extends Component {
  static propTypes = {
    cars2Go: PropTypes.shape({
      ids: PropTypes.array,
      content: PropTypes.shape({
        id: PropTypes.number,
        address: PropTypes.string,
        engineType: PropTypes.string,
        exterior: PropTypes.string,
        interior: PropTypes.string,
        name: PropTypes.string,
        vin: PropTypes.string,
        fuel: PropTypes.number,
        coordinates: PropTypes.array,
      }),
    }),
    onFetchCars2Go: PropTypes.func,
  };

  static defaultProps = {
    cars2Go: [],
    onFetchCars2Go: () => {},
  };

  state = {
    activePage: 1,
    resultsPerPage: 10,
    status: 'GOOD',
  };

  componentDidMount() {
    this.props.onFetchCars2Go();
  }

  onStatusChange = (event) => {
    this.setState({
      status: event,
      activePage: 1,
    });
  }

  numberOfPages = 1;
  normalize = (car2GoIds) => {
    const ids = [];
    const content = {};
    const markers = [];
    car2GoIds.forEach((id) => {
      ids.push(id);
      content[id] = this.props.cars2Go.content[id];
      markers.push({
        position: {
          lat: this.props.cars2Go.content[id].coordinates[1],
          lng: this.props.cars2Go.content[id].coordinates[0],
        },
        key: id,
        defaultAnimation: 2,
        title: this.props.cars2Go.content[id].name,
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

  filterCar = a => (b) => {
    if (a === this.props.cars2Go.content[b].interior) {
      return true;
    }
    return false;
  }

  paginate = (pageSize, pageNumber) => {
    --pageNumber; // because pages logically start with 1, but technically with 0
    const cars = this.props.cars2Go.ids.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    if (this.state.status === 'GOOD' || this.state.status === 'UNACCEPTABLE') {
      const goodCars = this.props.cars2Go.ids.filter(this.filterCar(this.state.status));
      this.numberOfPages = Math.ceil(goodCars.length / this.state.resultsPerPage);
      return goodCars.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }
    this.numberOfPages = Math.ceil(this.props.cars2Go.ids.length / this.state.resultsPerPage);
    return cars;
  }

  render() {
    const { activePage, resultsPerPage } = this.state;
    const results = this.normalize(this.paginate(resultsPerPage, activePage));
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <Car2GoFilter onChange={this.onStatusChange} />
          <Car2GoTable
            cars2Go={results}
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

const mapStateToProps = ({ cars2Go }) => ({
  cars2Go,
});

const mapDispatchtoProps = {
  onFetchCars2Go: fetchCars2Go,
};

export default connect(mapStateToProps, mapDispatchtoProps)(
  Car2Go,
);
