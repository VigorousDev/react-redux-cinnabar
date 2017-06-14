import React, { Component, PropTypes } from 'react';
import CSSStyle from "./style.css";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import {
	SelectField,
	MenuItem,
} from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Pagination from 'material-ui-pagination';

import {Tabs, Tab} from 'material-ui/Tabs';

import Paper from 'material-ui/Paper';
import Loading from '../common/loading';

const pageSizes = [5, 10, 50];
const userData = {
	data: {
		data: {
			rows: [
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA",null],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA","Pending Allocation"],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA","delivered"],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA"," in tranSit"],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA"," allocated "],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA", "all"],
				["54c50b07-c2a7-49ba-9b0d-d1fa08dab0ae","6ddb2db69b0e34a7e157645e787b5c8b471b5270",null,"7446 Ferguson, Houston, Texas, 77018, USA","1577 Anthony, New York City, New York, 10151, USA",null],
			],
		}
	}
};
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
	pagination: {
		pageSize: {
				width: 100,
		},
		row: {
			whiteSpace: 'pre-wrap',
		},
		header_0:{
			width: 150,
			textAlign: 'center',
		},
		header_1:{
			width: 150,
			textAlign: 'center',
		},
		header_2:{
			width: 80,
			textAlign: 'center',
		},
		col_0: {
			width: 150,
			whiteSpace: 'white-space',
			wordWrap: 'break-word',
			textAlign: 'center',
		},
		col_1: {
			width: 150,
			whiteSpace: 'white-space',
			wordWrap: 'break-word',
			textAlign: 'center',
		},
		col_2: {
			width: 80,
			whiteSpace: 'white-space',
			wordWrap: 'break-word',
			textAlign: 'center',
		},
	},
	radioGroup: {
		width: '100%',
		display: 'flex',
		marginTop: 30,
		marginBottom: 20,
	},
	radioButton: {
		paddingLeft: 30,
		width: '25%',
	},
};

class PackageTracking extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter: '0',
			rows: userData.data.data.rows.slice(),
			rows_filtered: userData.data.data.rows.slice(),
			pageSize: 10,
			pageNumber: 1,
			totalPage: 1,
		}		
	}

	componentDidMount(){
		console.log(this.props.data);
		this.adjustPageNumber(this.state.rows_filtered, this.state.pageSize);
	}

	getTable() {
		let {rows_filtered, pageSize, pageNumber, totalPage} = this.state;
		// get pagination rows

		let startPos = (pageNumber - 1) * pageSize, endPos = pageNumber * pageSize;
		let rows_displayed = rows_filtered.slice(startPos, endPos);

		let body = rows_displayed.map((user, index) => {
			return (<TableRow style={styles.pagination.row} key={index} selectable={false}>
				<TableRowColumn style={styles.pagination.col_0}>{user[0]}</TableRowColumn>
				<TableRowColumn style={styles.pagination.col_1}>{user[1]}</TableRowColumn>
				<TableRowColumn style={styles.pagination.col_2}>{user[2]}</TableRowColumn>
				<TableRowColumn style={styles.pagination.col_0}>{user[3]}</TableRowColumn>
				<TableRowColumn style={styles.pagination.col_1}>{user[4]}</TableRowColumn>
				<TableRowColumn style={styles.pagination.col_2}>{user[5]}</TableRowColumn>
			</TableRow>);
		});
		return (
			<div style={{ maxHeight: 400, marginTop: 10 }}>
				<Table >
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn style={styles.pagination.header_0}>Order ID</TableHeaderColumn>
							<TableHeaderColumn style={styles.pagination.header_1}>Tracking Number</TableHeaderColumn>
							<TableHeaderColumn style={styles.pagination.header_2}>Numbers of items in package</TableHeaderColumn>
							<TableHeaderColumn style={styles.pagination.header_0}>Origin</TableHeaderColumn>
							<TableHeaderColumn style={styles.pagination.header_1}>Destination</TableHeaderColumn>
							<TableHeaderColumn style={styles.pagination.header_2}>Status</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
					 {body}
					</TableBody>
				</Table>
				<div className={CSSStyle["pagination-bar"]}>
					<div className={CSSStyle["pagination-item"]}>
						Total: {rows_filtered.length}
					</div>
					<div className={CSSStyle["pagination-control"]}>
						<Pagination total={totalPage} display={5} current={pageNumber} onChange={this.onPaginationClick}/>
					</div>
					<div className={CSSStyle["pagination-pageSize", "pagination-item"]}>
						<SelectField
							floatingLabelText="PageSize"
							value={pageSize}
							onChange={this.onPageSizeChange}
							style={styles.pagination.pageSize}
						>
							{
							pageSizes.map((size) => {
								return <MenuItem key={size} value={size} primaryText={size} />
								})
							}
						</SelectField>
					</div>
				</div>
			</div>
		);
	}

	adjustPageNumber = (rows_filtered, pageSize) => {
			let {pageNumber} = this.state;
			let total = rows_filtered.length;
			if ((pageNumber - 1) * pageSize >= total){
					pageNumber = 1;
			}
			let totalPage = Math.ceil(total / pageSize);
			this.setState({pageNumber: pageNumber, totalPage: totalPage});
	}
	onPaginationClick = (pageNumber) => {
			this.setState({pageNumber: pageNumber});
	}
	onPageSizeChange = (event, key, payload) => {
			this.setState({pageSize: payload});
			this.adjustPageNumber(this.state.rows_filtered, payload);
	}

	handleRadioChange (event, filter) {
		let rows = this.state.rows
		let rows_filtered = rows
		if(filter != 'all'){
			rows_filtered = rows_filtered.filter((item) =>{
				let status = !item[5] ? '' : item[5].trim().toLowerCase();
				return status == filter;
			});
		}

		this.setState({
			rows_filtered: rows_filtered,
			filter: filter,
		});
		this.adjustPageNumber(rows_filtered, this.state.pageSize);
	}

	render() { 
		return (
			<Paper style={styles.container} zDepth={1}>
				<div style={styles.header}>
					<div>
						Package Tracking
					</div>
				</div>
				<RadioButtonGroup name="status" defaultSelected="all" style={styles.radioGroup} onChange={this.handleRadioChange.bind(this)}>
					<RadioButton
						value="all"
						label="All"
						style={styles.radioButton}
					/>
					<RadioButton
						value="allocated"
						label="Allocated"
						style={styles.radioButton}
					/>
					<RadioButton
						value="in transit"
						label="In Transit"
						style={styles.radioButton}
					/>
					<RadioButton
						value="delivered"
						label="Delivered"
						style={styles.radioButton}
					/>
				</RadioButtonGroup>
				{this.getTable()}
			</Paper>
		)
	}
}

export default PackageTracking;
