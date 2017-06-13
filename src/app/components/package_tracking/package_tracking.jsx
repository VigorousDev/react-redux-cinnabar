import React, { Component, PropTypes } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import Paper from 'material-ui/Paper';
import Loading from '../common/loading';

const userData = [
  {
    id: '1',
    name: 'user1',
    username: 'username1',
    email: 'user1@combotag.com',
    date: '2017/06/06',
    accountType: 'ADMIN',
    active: true,
  },
    {
        id: '2',
        name: 'user2',
        username: 'username2',
        email: 'user2@combotag.com',
        date: '2017/06/06',
        accountType: 'PUBLISHER',
        active: true,
    },
    {
        id: '3',
        name: 'user3',
        username: 'username3',
        email: 'user3@combotag.com',
        date: '2017/06/06',
        accountType: 'ADVERTISER',
        active: true,
    },
    {
        id: '4',
        name: 'user4',
        username: 'username4',
        email: 'user4@combotag.com',
        date: '2017/06/06',
        accountType: 'PILOT_PUBLISHER',
        active: true,
    },
    {
        id: '5',
        name: 'user5',
        username: 'username5',
        email: 'user5@combotag.com',
        date: '2017/06/06',
        accountType: 'PILOT_ADVERTISER',
        active: true,
    },
    {
        id: '6',
        name: 'user6',
        username: 'username6',
        email: 'user6@combotag.com',
        date: '2017/06/06',
        accountType: 'ACCOUNT_MANAGER',
        active: true,
    },
    {
        id: '7',
        name: 'user7',
        username: 'username7',
        email: 'user7@combotag.com',
        date: '2017/06/06',
        networkName: 'Remote',
        accountType: 'NETWORK',
        active: false,
    },
];
class PackageTracking extends Component{
  constructor(props){
    super(props);
    this.state = {
      tab: 'all'
    }    
  }

  getTable() {
    let body = userData.map((user, index) => {
                return (<TableRow key={user.id} selectable={false}>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.username}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.date}</TableRowColumn>
                  <TableRowColumn>{user.accountType}</TableRowColumn>
                  <TableRowColumn>{user.networkName}</TableRowColumn>                  
                </TableRow>);
              });
    return (
      <div style={{ maxHeight: 400, marginTop: 10 }}>
        {this.state.tab}
        <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Account Type</TableHeaderColumn>
                <TableHeaderColumn>Network Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {body}
            </TableBody>
        </Table>
      </div>
    );
  }

  handleTabChange (value) {
    this.setState({
      tab: value,
    });
  }

  render() {
    console.log(this.props.data);
    const styles = {
      container: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
      },
      header: {
        fontSize: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rightButton: {
        display: 'flex',
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return (
      <Paper style={styles.container} zDepth={1}>
        <div style={styles.header}>
          <div>
            Package Tracking
          </div>
        </div>
        <Tabs style={{marginTop: 30}}
          value={this.state.tab}
          onChange={this.handleTabChange.bind(this)}
        >
          <Tab label="All" value="all">
            {this.getTable()}
          </Tab>
          <Tab label="Allocated" value="allocated">
            {this.getTable()}
          </Tab>
          <Tab label="In Transit" value="in_transit">
            {this.getTable()}
          </Tab>
          <Tab label="Delivered" value="delivered">
            {this.getTable()}
          </Tab>
        </Tabs>        
      </Paper>
    )
  }
}

export default PackageTracking;
