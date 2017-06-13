import React, { Component } from 'react';
import { Cell } from 'fixed-data-table';
import RaisedButton from 'material-ui/RaisedButton';
import { SortTypes } from './sort_types';
import Checkbox from 'material-ui/Checkbox';

import colors from '../../util/colors';
import { formatDate } from '../../util/useful_functions';

export class CheckboxCell extends Component {
  isCellChecked() {
    return this.props.selectedRows.includes(this.props.data.indexMap[this.props.rowIndex]);
  }

  render() {
    const {rowIndex, selectedRows, addSelectedRow, field, data, ...props} = this.props;
    return (
      <Cell style={{
          color: colors.textColor,
          fontSize: 12,
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.lightBorder}`,
        }}
        {...props}
      >
        <Checkbox
          iconStyle={{ fill: colors.primary }}
          onCheck={() => addSelectedRow(data.indexMap[rowIndex])}
          checked={this.isCellChecked()}
        />
      </Cell>
    );
  }
}

export class PaginationCell extends Component {
  isCellChecked() {
    return this.props.selectedRows.includes(this.props.data.indexMap[this.props.rowIndex]);
  }

  render() {
    const {rowIndex, selectedRows, addSelectedRow, field, data, endRow, ...props} = this.props;
    if (rowIndex === endRow) console.log('end row!');
    return (
      <Cell
        {...props}
      >
      </Cell>
    );
  }
}

export class CheckboxHeaderCell extends Component {
  render() {
    const { toggleSelectAll, ...props } = this.props;
    return (
      <Cell
        style={{
          backgroundColor: colors.white,
          color: colors.primary,
          fontSize: 12,
        }}
        {...props}
      >
        <Checkbox
          iconStyle={{ fill: colors.primary }}
          onCheck={toggleSelectAll}
        />
      </Cell>
    );
  }
}

export class SortHeaderCell extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }

  reverseSortDirection(sortDir) {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
  }

  onSortChange(e) {
   e.preventDefault();

   if (this.props.onSortChange) {
     this.props.onSortChange(
       this.props.columnKey,
       this.props.sortDir ?
         this.reverseSortDirection(this.props.sortDir) :
         SortTypes.DESC
     );
   }
 }

  render() {
    const { onSortChange, sortDir, children, ...props } = this.props;
    return (
      <Cell {...props}
        style={{
          backgroundColor: colors.white,
          color: colors.textColor,
          fontSize: 12,
          fontWeight: 300,
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <a onClick={this.onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }
}

export class TextCell extends Component {
  formatTextField(text) {
    if (typeof(text) === 'number') {
      return text.toFixed(2);
    } else {
      return text;
    }
  }

  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const text = data.getObjectAt(rowIndex)[field];
    return (
      <Cell style={{
          color: colors.textColor,
          fontSize: 12,
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.lightBorder}`,
          textAlign: 'left',
        }}
        {...props}
      >
        {this.formatTextField(text)}
      </Cell>
    );
  }
}

export class DateCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const text = data.getObjectAt(rowIndex)[field];
    const date = formatDate(text);
    return (
      <Cell style={{
          color: colors.textColor,
          fontSize: 12,
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.lightBorder}`,
          textAlign: 'left',
        }}
        {...props}
      >
        {date}
      </Cell>
    );
  }
}

export const ActCell = ({ rowIndex, data, handleOpen, ...props }) => {
  return (
    <Cell {...props}
      style={{
        backgroundColor: colors.white,
        borderTop: `1px solid ${colors.lightBorder}`,
      }}
    >
      <RaisedButton
        label="ACT"
        labelStyle={{
          color: colors.primary,
        }}
        onClick={() => handleOpen([data.indexMap[rowIndex]], 'action')}
      />
    </Cell>
  );
}

export class NumberCell extends Component {
  getColor(number) {
    if (number < 0.6) {
      return colors.lowGreen;
    } else if (number >= 0.6 && number < 0.8) {
      return colors.mediumYellow;
    } else if (number >= 0.8) {
      return colors.highRed;
    } else {
      return 'blue';
    }
  }

  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell style={{
          backgroundColor: colors.white,
          color: this.getColor(data.getObjectAt(rowIndex)[field]),
          fontSize: 12,
          borderTop: `1px solid ${colors.lightBorder}`,
          textAlign: 'left',
        }}
        {...props}
      >
        {data.getObjectAt(rowIndex)[field].toFixed(2)}
      </Cell>
    );
  }
}
