import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/lib/Table';

const Car2GoTable = (props) => {
  const { cars2Go } = props;
  const cars2GoToShow = cars2Go.ids.map((car2GoId) => {
    const car2Go = cars2Go.content[car2GoId];
    return (
      <tr key={car2GoId}>
        <td>
          {car2GoId}
        </td>
        <td>
          {car2Go.address}
        </td>
        <td>
          {car2Go.engineType}
        </td>
        <td>
          {car2Go.fuel}
        </td>
        <td>
          {car2Go.interior}
        </td>
        <td>
          {car2Go.name}
        </td>
        <td>
          {car2Go.vin}
        </td>
        <td>
          {car2Go.coordinates[1]}
        </td>
        <td>
          {car2Go.coordinates[0]}
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
            <th>Address</th>
            <th>Engine Type</th>
            <th>Fuel</th>
            <th>Interior</th>
            <th>Name</th>
            <th>VIN</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {cars2GoToShow}
        </tbody>
      </Table>
    </div>
  );
};

Car2GoTable.propTypes = {
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
      coordinate: PropTypes.array,
    }),
  }),
};

Car2GoTable.defaultProps = {
  cars2Go: [],
};

export default Car2GoTable;
