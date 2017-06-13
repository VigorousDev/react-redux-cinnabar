import React, { Component } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';
import Snackbar from 'material-ui/Snackbar';

import StatCard from '../return_metrics/stat_card';
import PreventiveAlertsTable from '../tables/preventive_alerts_table';
import colors from '../../util/colors';

class PreventiveAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 'high',
      successSnackbar: this.isOpen('success'),
      failureSnackbar: this.isOpen('failure'),
    };
    this.buildTableDiv = this.buildTableDiv.bind(this);
    this.getCardCount = this.getCardCount.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  setLevel(level) {
    this.setState({
      level,
    });
  }

  getCardCount(level) {
    if (!this.props.preventiveAlerts) {
      return 0;
    }
    if (!this.props.preventiveAlerts[level]) {
      return 0;
    }
    return this.props.preventiveAlerts[level].rows.length;
  }

  isOpen(status) {
    return this.props.takeActionSuccess === status;
  }

  handleRequestClose() {
    this.setState({
      successSnackbar: false,
      failureSnackbar: false,
    });
    this.props.clearActionTaken();
  }

  buildTableDiv() {
    const rows = this.props.preventiveAlerts[this.state.level].rows;
    return (
      <ContainerDimensions>
        {({ width, height }) =>
          <PreventiveAlertsTable
            rows={rows}
            headers={this.props.preventiveAlerts.high.header}
            width={width}
            height={height}
            takeAction={this.props.takeAction}
            takeActionSuccess={this.props.takeActionSuccess}
          />
        }
      </ContainerDimensions>
    );
  }

  render() {
    const styles = {
      cell: {
        marginBottom: '1rem',
      },
    };

    return (
      <div>
        <Grid>
          <Cell width="1/3" style={styles.cell}>
            <StatCard
              color={colors.highRed}
              stat={'High'}
              number={this.getCardCount('high') || '0'}
              cursor="pointer"
              onClick={() => this.setLevel('high')}
            />
          </Cell>
          <Cell width="1/3" style={styles.cell}>
            <StatCard
              color={colors.mediumYellow}
              stat={'Medium'}
              number={this.getCardCount('medium') || '0'}
              cursor="pointer"
              onClick={() => this.setLevel('medium')}
            />
          </Cell>
          <Cell width="1/3" style={styles.cell}>
            <StatCard
              color={colors.lowGreen}
              stat={'Low'}
              number={this.getCardCount('low') || '0'}
              cursor="pointer"
              onClick={() => this.setLevel('low')}
            />
          </Cell>
          <Cell width="1" style={styles.cell}>
            <div style={{ height: 'calc(100vh - 96px - 56px - 110px)', width: '100%' }}>
              {this.buildTableDiv()}
            </div>
          </Cell>
        </Grid>
        <Snackbar
          open={this.state.successSnackbar}
          message="Action Successfully Taken"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

PreventiveAlerts.propTypes = {
  preventiveAlerts: React.PropTypes.object,
  takeAction: React.PropTypes.func.isRequired,
  clearActionTaken: React.PropTypes.func.isRequired,
  takeActionSuccess: React.PropTypes.string,
};

export default radium(PreventiveAlerts);
