import React from 'react';
import Paper from 'material-ui/Paper';
import FilterList from 'material-ui/svg-icons/content/filter-list';

const SearchBar = (props) => {
  const styles = {
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 256,
      height: 32,
    },
    text: {
      width: 227,
      height: '90%',
      border: 'none',
      paddingLeft: 5,
      fontSize: 14,
    },
  };

  return (
    <Paper zDepth={0} style={styles.box}>
      <FilterList />
      <input
        type="text"
        placeholder="Filter"
        onChange={props.onChange}
        style={styles.text}
      >
      </input>
    </Paper>
  );
};

export default SearchBar;
