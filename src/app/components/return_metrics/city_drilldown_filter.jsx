import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';

const CityDrilldownFilter = (props) => (
  <SelectField
    floatingLabelText="Select City"
    value={props.city}
    onChange={props.handleChange}
    autoWidth
    style={{ width: 256 }}
  >
    {props.cities}
  </SelectField>
);

CityDrilldownFilter.propTypes = {
  city: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  cities: PropTypes.array,
};

export default CityDrilldownFilter;
