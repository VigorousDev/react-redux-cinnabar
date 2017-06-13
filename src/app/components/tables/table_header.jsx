import React from 'react';
import SearchBar from '../common/search';
import FlatButton from 'material-ui/FlatButton';
import colors from '../../util/colors';

const TableHeader = ({ onFilterChange, rows, handleOpen }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    }}
  >
    <SearchBar onChange={onFilterChange} />
    <FlatButton
      label="Act on Selected Rows"
      primary
      labelStyle={{
        color: colors.primary,
        textTransform: 'none',
      }}
      onClick={() => handleOpen(rows, 'action')}
    />
  </div>
);

TableHeader.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired,
  handleOpen: React.PropTypes.func.isRequired,
  rows: React.PropTypes.array.isRequired,
};

export default TableHeader;
