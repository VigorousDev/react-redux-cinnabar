import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Table } from 'reactable';

import Loading from '../common/loading';

class LanePerformance extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      origin: undefined,
      destination: undefined,
      carrier: undefined,
      category: undefined,
      showTable: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lanes) {
      this.setState({
        loading: false,
      });
    }
  }

  getTable() {
    if (this.state.loading) {
      return <Loading size={100} />
    }
    if (this.state.showTable) {
      return (
        <div style={{ maxHeight: 400 }}>
          <Table
            className="return-table"
            data={this.buildData()}
            sortable
            itemsPerPage={5}
          />
        </div>
      );
    }
    if (this.props.lanes && this.props.lanes.length === 0) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}
        >
          No lanes found for given parameters
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
        }}
      >
        Select properties to view lane performance
      </div>
    );
  }

  handleChange(event, index, value, property) {
    const update = {};
    update[property] = value === '' ? null : value;
    this.setState(update);
  }

  handleClick() {
    if (this.state.origin && this.state.destination && this.state.carrier) {
      this.props.getLanes(
        this.state.origin,
        this.state.destination,
        this.state.carrier,
        this.state.category
      );
      this.setState({
        loading: true,
      });
    }
  }

  render() {
    const styles = {
      container: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
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
            Lane Performance
          </div>
          <div style={styles.rightButton}>
            <SelectField
              hintText="Origin"
              style={{ width: 124, marginRight: 24 }}
              onChange={(event, index, value) => this.handleChange(event, index, value, 'origin')}
              value={this.state.origin}
              autoWidth
            >
              {this.props.laneData.cities.map((c, i) => (
                <MenuItem value={c} primaryText={c} key={i} />
              ))}
            </SelectField>
            <SelectField
              hintText="Destination"
              style={{ width: 124, marginRight: 24 }}
              onChange={(event, index, value) => this.handleChange(event, index, value, 'destination')}
              value={this.state.destination}
              autoWidth
            >
              {this.props.laneData.cities.map((c, i) => (
                <MenuItem value={c} primaryText={c} key={i} />
              ))}
            </SelectField>
            <SelectField
              hintText="Carrier"
              style={{ width: 124, marginRight: 24 }}
              onChange={(event, index, value) => this.handleChange(event, index, value, 'carrier')}
              value={this.state.carrier}
              autoWidth
            >
              {this.props.laneData.couriers.filter(c => c !== '').map((c, i) => (
                <MenuItem value={c} primaryText={c} key={i} />
              ))}
            </SelectField>
            <SelectField
              hintText="Category"
              style={{ width: 124 }}
              onChange={(event, index, value) => this.handleChange(event, index, value, 'category')}
              value={this.state.category}
              autoWidth
            >
              <MenuItem value={''} primaryText="All" />
              {this.props.laneData.categories.map((c, i) => (
                <MenuItem value={c} primaryText={c} key={i} />
              ))}
            </SelectField>
            <FlatButton
              label="load"
              primary style={{ width: 102 }}
              onClick={this.handleClick}
            />
          </div>
        </div>
        {this.getTable()}
      </Paper>
    );
  }
}

export default LanePerformance;
