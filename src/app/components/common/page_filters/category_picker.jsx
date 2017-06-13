import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subject from 'material-ui/svg-icons/action/subject';
import IconButton from 'material-ui/IconButton';

import colors from '../../../util/colors';

class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textDisplay: 'none',
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
  }

  getCategory() {
    return this.props.category ? this.props.category : 'All Categories';
  }

  toggleHide() {
    if (this.state.textDisplay === 'block') {
      this.setState({ textDisplay: 'none' });
    } else {
      this.setState({ textDisplay: 'block' });
    }
  }

  buildCategories() {
    const categories = this.props.categories.map((c, i) => (
      <MenuItem value={c.value} primaryText={c.value} key={i} style={{ fontSize: 13 }} />
    ));
    return categories;
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
    const iconStyles = {
      color: this.props.isDisabled ? colors.disabled : colors.darkGrey,
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton iconStyle={iconStyles} onClick={this.handleTouchTap} onClick={this.toggleHide}>
          <Subject />
        </IconButton>
        <SelectField
          value={this.getCategory()}
          onChange={this.props.handleChange}
          style={{ fontSize: 13, width: '100%', display: this.state.textDisplay }}
          className="animated fadeInRight"
          disabled={this.props.isDisabled}
          autoWidth
        >
          <MenuItem value={'All Categories'} primaryText="All Categories" style={{ fontSize: 13 }} />
          {this.buildCategories()}
        </SelectField>
      </div>
    );
  }
}

CategoryPicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  category: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};

export default CategoryPicker;
