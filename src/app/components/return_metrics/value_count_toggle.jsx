import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { toggleValueCount } from '../../actions/UI_actions';


const ValueCountToggle = (props) => {
  const handleChange = () => (
    props.toggleValueCount()
  );

  const styles = {
    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  };

  return (
      <RadioButtonGroup
        name="dataType"
        valueSelected={props.valueCount}
        style={{ display: 'flex', flexDirection: 'column' }}
        onChange={handleChange}
      >
        <RadioButton
          value="value"
          label="value"
          style={{ fontSize: 14 }}
        />
        <RadioButton
          value="count"
          label="count"
          style={{ fontSize: 14 }}
        />
      </RadioButtonGroup>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleValueCount,
  }, dispatch);
}

function mapStateToProps({ UI }) {
  return {
    valueCount: UI.valueCount,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueCountToggle);
