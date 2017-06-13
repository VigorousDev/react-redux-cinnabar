import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const GenderFilter = (props) => (
  <SelectField
    value={props.getValue()}
    onChange={props.handleChange}
    floatingLabelText="select gender"
    style={{ fontSize: 13, width: 128 }}
    underlineStyle={{ display: 'none' }}
  >
    <MenuItem value={'all'} primaryText="All Genders" style={{ fontSize: 13 }} />
    <MenuItem value={'m'} primaryText="Men" style={{ fontSize: 13 }} />
    <MenuItem value={'f'} primaryText="Women" style={{ fontSize: 13 }} />
  </SelectField>
);

GenderFilter.propTypes = {
  getValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default GenderFilter;
