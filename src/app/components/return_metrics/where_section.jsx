import React, { Component, PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import HorizontalBarChart from '../charts/horizontal_bar';
import BarChart from '../charts/bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';
import CityDrilldownFilter from './city_drilldown_filter_container';
import colors from '../../util/colors';

class WhereSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.getInitialCity(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.city && nextProps.returnsByLocation) {
      if (nextProps.returnsByLocation[0]) {
        this.setState({
          city: nextProps.returnsByLocation[0].value,
        });
      }
    }
  }

  getReturnPercent() {
    if (this.props.returnPercentByCity && this.state.city && this.props.returnPercentByCity[0]) {
      const city = this.props.returnPercentByCity.filter(
        c => c.value === this.state.city
      )[0];
      const value = city ? `${city.count.toFixed(1)}%` : 'no data';
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 25, color: colors.primary, paddingRight: 10 }}>
            {value}
          </div>
          <div style={{ fontSize: 12 }}>
            of purchases returned by customers in {this.state.city}
          </div>
        </div>
      );
    }
  }

  getInitialCity() {
    if (this.props.returnsByLocation) {
      if (this.props.returnsByLocation[0]) {
        return this.props.returnsByLocation[0].value;
      }
    }
  }

  buildCities() {
    if (this.props.returnsByLocation) {
      return this.props.returnsByLocation.map((c, i) => (
        <MenuItem value={c.value} primaryText={c.value} key={i} style={{ fontSize: 13 }} />
      ));
    }
  }

  handleChange(value) {
    this.setState({
      city: value,
    });
  }

  render() {
    const styles = {
      cityDrilldown: {
        paddingLeft: 8,
        paddingRight: 8,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    };
    return (
      <Grid>
        <Cell width="1" style={this.props.cellStyle}>
          <Divider title="Where" />
        </Cell>
        <Cell width="1/2" style={this.props.cellStyle}>
          <ChartContainer
            chart={
              <HorizontalBarChart
                data={this.props.returnsByLocation}
                toolTipPartOne=" returns from "
                toolTipPartTwo=""
                value="value"
                limit={5}
                count="count"
                value="value"
                multiColor
                yLabel="number of returns"
              />
            }
            title="Cities with the most returns"
          />
        </Cell>
        <Cell width="1/2" style={this.props.cellStyle}>
          <ChartContainer
            chart={
              <HorizontalBarChart
                data={this.props.returnPercentByCity}
                toolTipPartOne=" % returns from "
                toolTipPartTwo=""
                value="value"
                limit={5}
                count="count"
                value="value"
                multiColor
                yLabel="percent of orders returned"
              />
            }
            title="Cities with the highest return percentage"
          />
        </Cell>
        <Cell width="1" style={this.props.cellStyle}>
          <Paper style={styles.cityDrilldown}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CityDrilldownFilter
                cities={this.buildCities()}
                handleChange={this.handleChange}
                city={this.state.city}
              />
              {this.getReturnPercent()}
            </div>
            <Grid>
              <Cell width="1/2" style={this.props.cellStyle}>
                <ChartContainer
                  chart={
                    <HorizontalBarChart
                      data={this.props.cityDrilldown.returnsByCategory}
                      count="count"
                      value="value"
                      limit={5}
                      toolTipPartOne=" returns in the "
                      toolTipPartTwo=" category"
                      multiColor
                      yLabel="number of returns"
                    />
                  }
                  title={`Returns by Category for ${this.state.city}`}
                />
              </Cell>
              <Cell width="1/2" style={this.props.cellStyle}>
                <ChartContainer
                  chart={
                    <BarChart
                      data={this.props.cityDrilldown.returnsByPrice}
                      toolTipPartOne=" orders returned within the $"
                      toolTipPartTwo=" price range"
                      count="value"
                      value="count"
                      yLabel="number of returns"
                      xLabel="price range ($USD)"
                      staggerLabels
                    />
                  }
                  title={`Returns by purchase price for ${this.state.city}`}
                />
              </Cell>
            </Grid>
          </Paper>
        </Cell>
        <Cell width="1" style={this.props.cellStyle}>
          <Divider />
        </Cell>
      </Grid>
    );
  }
}

WhereSection.propTypes = {
  returnsByLocation: PropTypes.array,
  returnPercentByCity: PropTypes.array,
  cellStyle: PropTypes.object.isRequired,
  cityDrilldown: PropTypes.object,
};

export default radium(WhereSection);
