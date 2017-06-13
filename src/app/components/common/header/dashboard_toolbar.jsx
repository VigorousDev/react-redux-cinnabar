import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import AccountCirlce from 'material-ui/svg-icons/action/account-circle';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import CategoryPicker from '../page_filters/category_picker_container';
import DateRangePicker from '../page_filters/date_range_picker_container';
import colors from '../../../util/colors';

const DashboardToolbar = (props) => {
  const showFilters = () => (
    props.showFilters() ?
      <ToolbarGroup>
        <DateRangePicker />
        <CategoryPicker isDisabled={props.isDisabled()} />
      </ToolbarGroup> :
      undefined
  );

  return (
    <AppBar
      title={<span style={{ color: colors.primary }}>supply.ai</span>}
      style={{ backgroundColor: colors.white }}
      iconElementLeft={<IconButton iconStyle={{ fill: colors.darkGrey }}><MenuIcon /></IconButton>}
      onLeftIconButtonTouchTap={props.toggleSidebar}
    >
      <ToolbarGroup>
        {showFilters()}
        <ToolbarSeparator />
        <IconButton iconStyle={{ fill: colors.darkGrey }} onClick={props.handlePopover}>
          <AccountCirlce />
        </IconButton>
      </ToolbarGroup>
      <Popover
        open={props.menuOpen}
        anchorEl={props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={props.handleRequestClose}
      >
        <Menu>
          <MenuItem primaryText="Account" onTouchTap={props.goAccount} />
          <MenuItem primaryText="Sign Out" onTouchTap={props.logout} />
        </Menu>
      </Popover>
    </AppBar>
  );
};

DashboardToolbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isDisabled: PropTypes.func.isRequired,
  goAccount: PropTypes.func.isRequired,
  handlePopover: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.element,
};

export default DashboardToolbar;
