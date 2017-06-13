import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../common/loading';
import ChartTable from './chart_table';

class ChartTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  getData() {
    return [
      {
        cat: 'sprinkles',
        parrot: 'theodore',
        demon: 'beezlebub',
      },
      {
        cat: 'mrowr',
        parrot: 'frumplestilskin',
        demon: 'baal',
      },
      {
        cat: 'george',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'sdfgsdfg',
        parrot: 'creamcheese',
        demon: 'Durian',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
      {
        cat: 'moop',
        parrot: 'sally',
        demon: 'mephisto',
      },
    ];
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <ChartTable
        data={this.getData()}
        filterable={['cat', 'parrot', 'demon']}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

function mapStateToProps(state) {
  return {

  };
}

ChartTableContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartTableContainer);
