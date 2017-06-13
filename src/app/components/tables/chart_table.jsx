import React, { PropTypes } from 'react';
import { Table } from 'reactable';

const ChartTable = (props) => {
  return (
    <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
      <div style={{ paddingLeft: 16, fontWeight: 300 }}>Search</div>
      <Table
        className="return-table"
        data={props.data}
        sortable
        filterable={props.filterable}
        itemsPerPage={5}
      />
    </div>
  );
};

export default ChartTable;
