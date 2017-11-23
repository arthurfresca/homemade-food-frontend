import React from 'react';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import PropTypes from 'prop-types';

const Car2GoFilter = (props) => {
  const { onChange } = props;
  return (
    <div className="row margin-top-20">
      <div className="col-md-9">
        <ButtonToolbar>
          <ToggleButtonGroup onChange={onChange} type="radio" name="options" defaultValue={'GOOD'}>
            <ToggleButton value={'GOOD'}>GOOD</ToggleButton>
            <ToggleButton value={'UNACCEPTABLE'}>UNACCEPTABLE</ToggleButton>
            <ToggleButton value={'ALL'}>ALL</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
};

Car2GoFilter.propTypes = {
  onChange: PropTypes.func,
};

Car2GoFilter.defaultProps = {
  onChange: () => {},
};

export default Car2GoFilter;
