import React from 'react';
import {Row, Col, Icon} from 'antd';
import { connect } from 'react-redux';
import {DeleteReminder} from './Actions';

class Reminder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {reminder, deleteReminder, editReminder, weathers} = this.props;
		const icon = weathers[reminder.city] ? weathers[reminder.city].weather : "";
		console.log("weathers[reminder.city]", weathers[reminder.city])
		return (
			<Row className="reminder" style={{background: `${reminder.color.hex}63`}}>
				<Col span={1}>
					<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
				</Col>
				<Col span={19}>
					{reminder.label}
				</Col>
				<Col span={2} className="actions">
					<Icon type="edit" onClick={() => editReminder(reminder)}/>
				</Col>
				<Col span={2} className="actions">
					<Icon type="delete" onClick={() => deleteReminder(reminder)}/>
				</Col>
			</Row>	
		);
	}
}

const mapStateToProps = (state) => {
	return {
		weathers: state.calendar.weathers
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteReminder: (reminder) => dispatch(DeleteReminder(reminder))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
