import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Email from 'material-ui/svg-icons/communication/email';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import Place from 'material-ui/svg-icons/maps/place';
import LocalShippng from 'material-ui/svg-icons/maps/local-shipping';
import Directions from 'material-ui/svg-icons/maps/directions';
import colors from '../../../util/colors';

const Sidebar = (props) => {
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: colors.white,
      primary2Color: colors.darkGrey,
      primary3Color: '#D8D9D9',
      accent1Color: colors.primary,
      textColor: colors.white,
      alternateTextColor: '#D8D9D9',
    },
    listItem: {
      textColor: colors.white,
    },
  });

  return (
    <Drawer
      open={props.open || false}
      containerStyle={{
        height: 'calc(100vh - 64px',
        marginTop: '64px',
        backgroundColor: colors.darkGrey,
        //zIndex: 1001,
      }}
      onRequestChange={props.closeSidebar}
      docked={false}
    >
      <MuiThemeProvider muiTheme={muiTheme}>
        <List>
          <ListItem
            primaryText="Return Intelligence"
            leftIcon={<ShowChart color={'#D8D9D9'} />}
            initiallyOpen
            primaryTogglesNestedList
            style={{ color: '#D8D9D9', fontSize: 14 }}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Return Metrics"
                style={{
                  fontSize: 12,
                  paddingLeft: 40,
                  color: props.getColor('returnmetrics'),
                }}
                onClick={() => props.goToPage('/returnmetrics')}
              />,
              <ListItem
                key={2}
                primaryText="User Metrics"
                style={{
                  fontSize: 12,
                  paddingLeft: 40,
                  color: props.getColor('usermetrics'),
                }}
                onClick={() => props.goToPage('/usermetrics')}
              />,
            ]}
          />
          <ListItem
            primaryText="Preventive Alerts"
            leftIcon={<ViewList color={'#D8D9D9'} />}
            style={{
              fontSize: 14,
              color: props.getColor('preventivealerts'),
            }}
            onClick={() => props.goToPage('/preventivealerts')}
          />
          <ListItem
            primaryText="Returns Map"
            leftIcon={<Place color={'#D8D9D9'} />}
            style={{
              fontSize: 14,
              color: props.getColor('returnsmap'),
            }}
            onClick={() => props.goToPage('/returnsmap')}
          />
          <ListItem
            primaryText="Email Tracking"
            leftIcon={<Email color={'#D8D9D9'} />}
            style={{
              fontSize: 14,
              color: props.getColor('emailtracking'),
            }}
            onClick={() => props.goToPage('/emailtracking')}
          />
          <ListItem
            primaryText="Carrier Allocation"
            leftIcon={<LocalShippng color={'#D8D9D9'} />}
            style={{
              fontSize: 14,
              color: props.getColor('carrierallocation'),
            }}
            onClick={() => props.goToPage('/carrierallocation')}
          />
          <ListItem
            primaryText="Lane Performance"
            leftIcon={<Directions color={'#D8D9D9'} />}
            style={{
              fontSize: 14,
              color: props.getColor('laneperformance'),
            }}
            onClick={() => props.goToPage('/laneperformance')}
          />
        </List>
      </MuiThemeProvider>
    </Drawer>
  );
};

Sidebar.propTypes = {
  goToPage: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default Sidebar;

// <ListItem
//   primaryText="Return Sense Performance"
//   leftIcon={<Poll color={'#D8D9D9'} />}
//   style={{
//     fontSize: 14,
//     color: props.getColor('returnsenseperformance'),
//   }}
//   onClick={() => props.goToPage('/returnsenseperformance')}
// />
