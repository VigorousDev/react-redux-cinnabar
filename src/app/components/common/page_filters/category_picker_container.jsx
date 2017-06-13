import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCategory, getBatchData, clearAllData, getData } from '../../../actions';
import CategoryPicker from './category_picker';
import { allUserMetrics } from '../../../util/api/user_metrics';
import { allReturnMetrics } from '../../../util/api/return_metrics';

class CategoryPickerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.disabled = this.disabled.bind(this);
  }

  componentWillMount() {
    if (!this.props.categories) {
      this.props.getData(
        'returnsByCategory',
        ['start_date', 'end_date'],
        'categories'
      );
    }
  }

  handleChange(event, index, value) {
    if (value === 'All Categories') {
      this.props.updateCategory(null);
      this.fetchData();
    } else {
      this.props.updateCategory(value);
      this.fetchData();
    }
  }

  fetchData() {
    this.props.clearAllData();
    this.props.getData(
      'returnsByCategory',
      ['start_date', 'end_date'],
      'categories'
    );
    switch (window.location.pathname) {
      case '/returnmetrics':
        this.props.getBatchData(allReturnMetrics(), 'returnMetrics');
        this.props.getBatchData({
          returnsByCategory: ['start_date', 'end_date', 'category', 'customer_city'],
          returnsByPrice: ['start_date', 'end_date', 'category', 'customer_city'],
        }, 'cityDrilldown');
        break;
      case '/usermetrics':
        this.props.getBatchData(allUserMetrics(), 'userMetrics');
        break;
      case '/returnsmap':
        this.props.getData(
          'mapData',
          ['start_date', 'end_date', 'category'],
          'mapData'
        );
        break;
      default:
        console.log('bad window location for category picker');
    }
  }

  disabled() {
    if (this.props.isDisabled || !this.props.categories) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <CategoryPicker
        category={this.props.category}
        handleChange={this.handleChange}
        isDisabled={this.disabled()}
        categories={this.props.categories || []}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCategory,
    getBatchData,
    clearAllData,
    getData,
  }, dispatch);
}

function mapStateToProps(state) {
  const getCategories = state.data.categories ?
    state.data.categories.returnsByCategory : undefined;
  return {
    category: state.filters.category,
    categories: getCategories,
  };
}

CategoryPickerContainer.propTypes = {
  updateCategory: React.PropTypes.func.isRequired,
  clearAllData: React.PropTypes.func.isRequired,
  getBatchData: React.PropTypes.func.isRequired,
  getData: React.PropTypes.func.isRequired,
  category: React.PropTypes.string,
  isDisabled: React.PropTypes.bool.isRequired,
  categories: React.PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPickerContainer);
