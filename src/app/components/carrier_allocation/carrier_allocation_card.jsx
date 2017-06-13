import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Table } from 'reactable';
import Dialog from 'material-ui/Dialog';

import Loading from '../common/loading';
import { formatDateLong } from '../../util/useful_functions';

class CarrierAllocation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      action: 'load',
      loading: false,
      idList: this.getQSIds(),
      dialogOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders) {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidMount() {
    if (this.state.idList) {
      this.handleClick();
    }
  }

  formatData() {
    const data = this.props.orders.slice();
    for (const i in data) {
      data[i].order_created_date = formatDateLong(data[i].order_created_date);
    }
    return data;
  }

  getQSIds() {
    if (window.location.search.includes('order_id')) {
      return window.location.search.slice(11).split(',');
    }
    return '';
  }

  getTable() {
    if (this.state.loading) {
      return <Loading size={100} />;
    }
    if (!this.props.orders) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}
        >
          Load order IDs to allocate carrier
        </div>
      );
    }
    if (this.props.orders && this.props.orders.length > 0) {
      return (
        <div>
          <Table
            className="return-table"
            data={this.formatData()}
            sortable
            itemsPerPage={6}
          />
        </div>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          minWidth: 960,
        }}
      >
        No orders found for given IDs
      </div>
    );
  }

  getButtonText() {
    return this.state.action;
  }

  handleChange(e, value) {
    this.setState({
      idList: value.split(' ').filter(v => v !== ''),
      action: 'load',
      buttonDisabled: false,
    });
  }

  isDisabled() {
    return (this.state.action === 'allocate' &&
    (!this.props.orders || this.props.orders.length < 1)) ||
    this.state.buttonDisabled ||
    this.state.loading;
  }

  handleClick() {
    if (this.state.idList.length < 1) return;
    if (this.state.action === 'load') {
      this.props.getOrders(this.state.idList);
      this.setState({
        action: 'allocate',
        loading: true,
      });
    } else if (this.state.action === 'allocate') {
      this.props.setCarrier(this.state.idList);
      this.setState({
        action: 'ship',
        loading: true,
      });
    } else {
      this.setState({
        buttonDisabled: true,
        action: 'load',
        loading: false,
        dialogOpen: true,
      });
    }
  }

  handleClose() {
    this.setState({
      dialogOpen: false,
    });
    this.props.takeAction(this.state.idList, 'shipped');
  }

  getActions() {
    return [
      <FlatButton
        label="Print Label"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];
  }

  render() {
    const styles = {
      container: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
        minWidth: 960,
      },
      header: {
        fontSize: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rightButton: {
        display: 'flex',
      },
    };
    return (
      <Paper style={styles.container} zDepth={1}>
        <div style={styles.header}>
          <div>
            Carrier Allocation
          </div>
          <div style={styles.rightButton}>
            <TextField
              hintText="Order ID/s (separate with spaces)"
              onChange={this.handleChange}
              value={this.state.idList}
            />
            <FlatButton
              label={this.getButtonText()}
              primary style={{ width: 102 }}
              onClick={this.handleClick}
              disabled={this.isDisabled()}
            />
          </div>
        </div>
        {this.getTable()}
        <Dialog
          title="Order is Ready to Ship"
          actions={this.getActions()}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        />
      </Paper>
    );
  }
}

CarrierAllocation.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array,
  setCarrier: PropTypes.func.isRequired,
};

export default CarrierAllocation;