import React, { PropTypes } from 'react';
import radium from 'radium';
import { Grid, Cell } from 'radium-grid';
import ContainerDimensions from 'react-container-dimensions';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import StatCard from '../return_metrics/stat_card';
import barColors from '../../util/bar_colors';
import Tree from './tree.jsx';

const EmailTracking = (props) => {
  const styles = {
    cell: {
      marginBottom: 15,
    },
    funnelCell: {
      marginBottom: 15,
      height: '85%',
      width: '100%',
    },
    treeCell: {
      marginBottom: 15,
      height: '65%',
      width: '100%',
    },
  };

  const getOpenRate = () => {
    const percent = (props.data.emailsOpenedPre[0].count + 20) / (props.data.emailsSentPre[0].count + 20) * 100;
    return `${percent.toFixed(0)}%`;
  };

  const getClickRate = () => {
    let percent;
    if (props.emailType === 'all email types') {
      percent = (props.data.emailLinksClickedChange[0].count + 20) / (props.data.emailsSentPre[0].count) * 100;
    } else {
      percent = (props.data.emailLinksClickedChange[0].count + 20) / (props.data.emailsSentPre[0].count + 20) * 100;
    }
    return `${percent.toFixed(0)}%`;
  };

  const getChangeRate = () => {
    const percent = (props.data.orderChanged[0].count) / (props.data.emailsSentPre[0].count + 20) * 100;
    return `${percent.toFixed(0)}%`;
  };

  return (
    <Grid>
      <Cell width="1/4" style={styles.cell}>
        <StatCard
          color={barColors[0]}
          stat={'Order Change Emails Sent'}
          number={20 + props.data.emailsSentPre[0].count}
        />
      </Cell>
      <Cell width="1/4" style={styles.cell}>
        <StatCard
          color={barColors[1]}
          stat="Emails Opened"
          number={20 + props.data.emailsOpenedPre[0].count}
          secondNumber={getOpenRate()}
          secondLabel="Open Rate"
        />
      </Cell>
      <Cell width="1/4" style={styles.cell}>
        <StatCard
          color={barColors[2]}
          stat="Links Clicked"
          number={20 + props.data.emailLinksClickedChange[0].count}
          secondLabel="Click Rate"
          secondNumber={getClickRate()}
        />
      </Cell>
      <Cell width="1/4" style={styles.cell}>
        <StatCard
          color={barColors[3]}
          stat={'Orders Changed'}
          number={props.data.orderChanged[0].count}
          secondNumber={getChangeRate()}
          secondLabel="Order Change Rate"
        />
      </Cell>
      <Cell width="1" style={styles.cell}>
        <RadioButtonGroup
          style={{ width: 256 }}
          name="dataType"
          valueSelected={props.emailType}
          onChange={props.handleChange}
        >
          <RadioButton
            value="mismatch"
            label="Mismatch"
            style={{ fontSize: 14 }}
          />
          <RadioButton
            value="split shipment"
            label="Split Shipment"
            style={{ fontSize: 14 }}
          />
          <RadioButton
            value="all email types"
            label="All Email Types"
            style={{ fontSize: 14 }}
          />
        </RadioButtonGroup>
      </Cell>
      <Cell width="1" align="middle" style={styles.treeCell}>
        <ContainerDimensions>
            {({ height, width }) =>
              <Tree height={height} width={width} emailType={props.emailType} data={props.data} />
            }
        </ContainerDimensions>
      </Cell>
    </Grid>
  );
};

EmailTracking.propTypes = {
  emailType: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default radium(EmailTracking);
