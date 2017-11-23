import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/lib/Table';

const TaxiTable = (props) => {
  const { taxies } = props;
  const taxiesToShow = taxies.ids.map((taxiId) => {
    const taxi = taxies.content[taxiId];
    return (
      <tr key={taxiId}>
        <td>
          {taxiId}
        </td>
        <td>
          {taxi.state}
        </td>
        <td>
          {taxi.type}
        </td>
        <td>
          {taxi.coordinate.latitude}
        </td>
        <td>
          {taxi.coordinate.longitude}
        </td>
      </tr>
    );
  });

  return (
    <div className="row margin-top-20">
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#Id</th>
            <th>State</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {taxiesToShow}
        </tbody>
      </Table>
    </div>
  );
};

TaxiTable.propTypes = {
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
};

TaxiTable.defaultProps = {
  taxies: [],
};

export default TaxiTable;
