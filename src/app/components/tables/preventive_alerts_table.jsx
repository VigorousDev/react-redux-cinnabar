import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import Paper from 'material-ui/Paper';
import { uniq } from 'lodash';

import {
  TextCell,
  NumberCell,
  SortHeaderCell,
  CheckboxCell,
  CheckboxHeaderCell,
  ActCell,
  DateCell,
  PaginationCell,
} from './cell_types';
import { SortTypes } from './sort_types';
import DataListWrapper from './data_list_wrapper';
import ActDialogue from './act_dialogue';
import TableHeader from './table_header';
import colors from '../../util/colors';

class PreventiveAlertsTable extends Component {
  constructor(props) {
    super(props);

    this.defaultSortIndexes = [];
    const size = this.props.rows.length;
    for (let index = 0; index < size; index++) {
      this.defaultSortIndexes.push(index);
    }

    this.state = {
      dataList: new DataListWrapper(
        this.defaultSortIndexes,
        this.props.rows
      ),
      defaultSortIndexes: this.defaultSortIndexes,
      colSortDirs: {},
      selectedRows: [],
      allSelected: false,
      actionOpen: false,
      emailOpen: false,
      endRow: 50,
    };

    this.buildColumns = this.buildColumns.bind(this);
    this.getColumnCell = this.getColumnCell.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.addSelectedRow = this.addSelectedRow.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCloseAction = this.handleCloseAction.bind(this);
    this.handleCloseEmail = this.handleCloseEmail.bind(this);
    this.takeAction = this.takeAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextSortIndexes = [];
    const size = nextProps.rows.length;
    for (let index = 0; index < size; index++) {
      nextSortIndexes.push(index);
    }
    this.setState({
      dataList: new DataListWrapper(
        nextSortIndexes,
        nextProps.rows
      ),
      defaultSortIndexes: nextSortIndexes,
      colSortDirs: {},
      selectedRows: [],
      allSelected: false,
      dialogueOpen: false,
    });
  }

  onFilterChange(e) {
    const dataList = this.state.sortedDataList ?
      this.state.sortedDataList :
      new DataListWrapper(
        this.state.defaultSortIndexes,
        this.props.rows
      );

    const filterBy = e.target.value.toString().toLowerCase();
    const size = dataList.getSize();
    const filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      for (let header = 0; header < this.props.headers.length; header++) {
        if (!dataList.getObjectAt(index)[header]) { continue; }
        const rowCheck = dataList.getObjectAt(index)[header].toString().toLowerCase();
        if (rowCheck.indexOf(filterBy) !== -1) {
          filteredIndexes.push(dataList.indexMap[index]);
        }
      }
    }

    this.setState({
      dataList: new DataListWrapper(
        uniq(filteredIndexes),
        this.props.rows
      ),
    });
  }

  onSortChange(columnKey, sortDir) {
    const sortIndexes = this.state.defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      const valueA = this.props.rows[indexA][columnKey];
      const valueB = this.props.rows[indexB][columnKey];
      let sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });
    this.setState({
      dataList: new DataListWrapper(sortIndexes, this.props.rows),
      sortedDataList: new DataListWrapper(
        sortIndexes,
        this.props.rows
      ),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  getFlexGrowValue(columnNumber) {
    switch (columnNumber) {
      case 1:
        return 4;
      case 8:
        return 2;
      default:
        return 1;
    }
  }

  getColumnCell(columnNumber) {
    switch (columnNumber) {
      case 8:
        return (
          <NumberCell
            data={this.state.dataList}
            field={columnNumber}
          />
        );
      case 7:
        return (
          <NumberCell
            data={this.state.dataList}
            field={columnNumber}
          />
        );
      case 0:
        return (
          <DateCell
            data={this.state.dataList}
            field={columnNumber}
          />
        );
      default:
        return (
          <TextCell
            data={this.state.dataList}
            field={columnNumber}
          />
        );
    }
  }

  buildColumns() {
    const columns = [];
    columns.push(
      <Column
        key="pagination"
        flexGrow={0}
        cell={
          <PaginationCell
            endRow={this.state.endRow}
          />
        }
        width={0}
      />
    );

    columns.push(
      <Column
        key="checkbox"
        flexGrow={0.3}
        header={<CheckboxHeaderCell toggleSelectAll={this.toggleSelectAll} />}
        cell={
          <CheckboxCell
            addSelectedRow={this.addSelectedRow}
            data={this.state.dataList}
            selectedRows={this.state.selectedRows}
          />
        }
        width={40}
      />
  );

    const headers = Object.keys(this.props.headers)
      .map(key => this.props.headers[key]);
    for (let i = 0; i < headers.length; i++) {
      columns.push(
        <Column
          columnKey={i}
          header={
            <SortHeaderCell
              onSortChange={this.onSortChange}
              sortDir={this.state.colSortDirs[i]}
            >
              {headers[i]}
            </SortHeaderCell>
          }
          cell={this.getColumnCell(i)}
          flexGrow={this.getFlexGrowValue(i)}
          width={50}
          key={i}
          style={{
            border: '5px solid blue',
          }}
        />
      );
    }

    columns.push(
      <Column
        key="act"
        header={
          <Cell
            style={{
              backgroundColor: colors.white,
              color: colors.darkGrey,
              fontSize: 12,
              fontWeight: 300,
            }}
          >
            Take Action
          </Cell>
        }
        cell={
          <ActCell
            data={this.state.dataList}
            handleOpen={this.handleOpen}
          />
        }
        width={100}
      />
  );
    return columns;
  }

  addSelectedRow(row) {
    const rows = this.state.selectedRows;
    if (rows.includes(row)) {
      const index = rows.indexOf(row);
      rows.splice(index, 1);
    } else {
      rows.push(row);
    }
    this.setState({
      selectedRows: rows,
    });
  }

  toggleSelectAll() {
    if (this.state.allSelected) {
      this.setState({
        selectedRows: [],
        allSelected: false,
      });
    } else {
      const rows = Object.keys(this.state.dataList.indexMap)
        .map(key => this.state.dataList.indexMap[key]);
      this.setState({
        selectedRows: rows,
        allSelected: true,
      });
    }
  }

  handleOpen(selectedRows, dialog) {
    const newState = {};
    newState.selectedRows = selectedRows;
    newState[`${dialog}Open`] = true;
    this.setState(newState);
  }

  handleCloseAction() {
    this.setState({
      actionOpen: false,
    });
  }

  handleCloseEmail() {
    this.setState({
      emailOpen: false,
    });
  }

  takeAction(...args) {
    this.props.takeAction(...args);
    this.setState({
      actionOpen: false,
    });
  }

  render() {
    return (
      <Paper zDepth={0}>
        <TableHeader
          onFilterChange={this.onFilterChange}
          rows={this.state.selectedRows}
          handleOpen={this.handleOpen}
        />
        <Table
          rowsCount={this.state.dataList.indexMap.length}
          headerHeight={50}
          rowHeight={50}
          width={this.props.width}
          height={this.props.height}
        >
          {this.buildColumns()}
        </Table>
        <ActDialogue
          open={this.state.actionOpen}
          rows={this.state.selectedRows}
          handleClose={this.handleCloseAction}
          data={this.state.dataList}
          takeAction={this.props.takeAction}
          handleOpen={this.handleOpen}
        />
      </Paper>
    );
  }
}

PreventiveAlertsTable.propTypes = {
  rows: React.PropTypes.array.isRequired,
  headers: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  takeAction: React.PropTypes.func.isRequired,
};

export default PreventiveAlertsTable;
