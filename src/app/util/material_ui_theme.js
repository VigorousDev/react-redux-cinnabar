import getMuiTheme from 'material-ui/styles/getMuiTheme';

import colors from './colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.primary,
    primary2Color: colors.secondary,
    primary3Color: 'blue',
    accent1Color: colors.primary,
    accent2Color: 'blue',
    accent3Color: 'blue',
    textColor: colors.textColor,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.lightGrey,
  },
  listItem: {
    textColor: '#FFFFFF',
  },
});

export default muiTheme;
