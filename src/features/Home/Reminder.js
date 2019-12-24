import React from 'react';
import {Row, Col, Icon, Tooltip, Typography} from 'antd';
import { connect } from 'react-redux';
import {DeleteReminder} from './Actions';

const { Text } = Typography;

class Reminder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {reminder, deleteReminder, editReminder, weathers} = this.props;
		const icon = weathers[reminder.city] ? weathers[reminder.city][0].weather : "";
		const weatherDescription = weathers[reminder.city] ? weathers[reminder.city][0].description : "";

		return (
			<Row className="reminder" style={{background: `${reminder.color.hex}63`}}>
				<Tooltip title={
					<Col span={24}>
						<Col span={2}>
							<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} style={{width: '100%'}}/>
						</Col>
						<Col span={22}>
							<Text ellipsis={true} style={{width: '100%', color: 'white'}}>
								{weatherDescription}
							</Text>
						</Col>
					</Col>
				}>
					<Col span={2}>
							<img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} style={{width: '100%'}}/>
					</Col>
				</Tooltip>
				<Tooltip title={reminder.label}>
					<Col span={18}>
						<Text ellipsis={true} style={{width: '100%'}}>
							{reminder.label}
						</Text>
					</Col>
				</Tooltip>
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
