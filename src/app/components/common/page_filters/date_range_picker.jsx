import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import Popover from 'material-ui/Popover';
import DateRangeIcon from 'material-ui/svg-icons/action/date-range';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import colors from '../../../util/colors';
import { formatDateLong } from '../../../util/useful_functions';
import DateRanges from '../../../util/date_ranges';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textDisplay: 'none',
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  setUpdate() {
    this.handleRequestClose();
    this.props.setUpdate();
  }

  toggleHide() {
    if (this.state.textDisplay === 'block') {
      this.setState({ textDisplay: 'none' });
    } else {
      this.setState({ textDisplay: 'block' });
    }
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { startDate, endDate } = this.props;
    const iconStyles = {
      color: colors.darkGrey,
    };
    const end = new Date(endDate);
    end.setDate(end.getDate() - 2);
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton iconStyle={iconStyles} onClick={this.toggleHide}>
          <DateRangeIcon />
        </IconButton>
        <TextField
          id={'1'}
          value={`${formatDateLong(startDate)} - ${formatDateLong(end)}`}
          onClick={this.handleTouchTap}
          style={{ fontSize: 13, display: this.state.textDisplay }}
          className="animated fadeInRight"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <DateRange
            linkedCalendars
            ranges={DateRanges}
            onInit={this.props.handleChange}
            onChange={this.props.handleChange}
            theme={{
              Calendar: { width: 200 },
              PredefinedRanges: { marginLeft: 10, marginTop: 10 },
              DaySelected: { background: colors.primary },
              DayInRange: { background: colors.darkGrey },
              PredefinedRangesItem: { background: colors.lightGrey, color: colors.darkGrey },
              PredefinedRangesItemActive: { color: colors.primary },
            }}
          />
          <div style={{ display: 'flex' }}>
            <FlatButton
              labelStyle={{ color: colors.primary }}
              label="Apply New Range"
              onClick={this.setUpdate}
            />
            <FlatButton
              label="Cancel"
              onClick={this.handleRequestClose}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

DateRangePicker.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  setUpdate: React.PropTypes.func.isRequired,
  startDate: React.PropTypes.string,
  endDate: React.PropTypes.string,
};

export default DateRangePicker;
