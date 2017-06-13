import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import IconButton from 'material-ui/IconButton';
import ReactGA from 'react-ga';

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.getStyles = this.getStyles.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getStyles() {
    const height = this.props.height || 380;
    const styles = {
      container: {
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        width: '100%',
        minWidth: 360,
      },
      chartHeader: {
        width: '100%',
        minHeight: 69,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 20,
      },
      fullScreen: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        width: '95%',
        height: '60vh',
      },
    };

    return styles;
  }

  handleOpen() {
    ReactGA.modalview(`${this.props.title}`);
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleChange(e, value) {
    this.setState({
      emailType: value,
    });
  }

  render() {
    const styles = this.getStyles();
    return (
      <Paper
        style={styles.container}
        zDepth={1}
      >
        <div style={styles.chartHeader}>
          <div>
            {this.props.title}
          </div>
          {this.props.filter}
          <IconButton onClick={this.handleOpen} >
            <FullScreen />
          </IconButton>
        </div>
        {React.cloneElement(this.props.chart, { title: this.props.title })}
        <Dialog
          title={this.props.title}
          autoDetectWindowHeight
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{ width: '90vw', maxWidth: 'none' }}
        >
          <div style={styles.fullScreen}>
            {this.props.chart}
          </div>
        </Dialog>
      </Paper>
    );
  }
}

ChartContainer.propTypes = {
  chart: PropTypes.element,
  title: PropTypes.string.isRequired,
  filter: PropTypes.element,
  fullScreen: PropTypes.bool,
  height: PropTypes.number,
};

export default ChartContainer;
