import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TrendsIntervalFilter = (props) => (
  <SelectField
    value={props.getValue()}
    onChange={props.handleChange}
    style={{ fontSize: 13, width: 96 }}
    underlineStyle={{ display: 'none' }}
    autoWidth
    floatingLabelText="Select Interval"
  >
    <MenuItem value={'day'} primaryText="Daily" style={{ fontSize: 13 }} />
    <MenuItem value={'week'} primaryText="Weekly" style={{ fontSize: 13 }} />
    <MenuItem value={'month'} primaryText="Monthly" style={{ fontSize: 13 }} />
  </SelectField>
);

TrendsIntervalFilter.propTypes = {
  getValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TrendsIntervalFilter;
