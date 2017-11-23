import React from 'react';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import PropTypes from 'prop-types';

const MyTaxiFilter = (props) => {
  const { onChange } = props;
  return (
    <div className="row margin-top-20">
      <div className="col-md-9">
        <ButtonToolbar>
          <ToggleButtonGroup onChange={onChange} type="radio" name="options" defaultValue={'ACTIVE'}>
            <ToggleButton value={'ACTIVE'}>ACTIVE</ToggleButton>
            <ToggleButton value={'INACTIVE'}>INACTIVE</ToggleButton>
            <ToggleButton value={'ALL'}>ALL</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
};

MyTaxiFilter.propTypes = {
  onChange: PropTypes.func,
};

MyTaxiFilter.defaultProps = {
  onChange: () => {},
};

export default MyTaxiFilter;
