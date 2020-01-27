import React from 'react';
import {Row, Col, Icon, Tooltip, Typography} from 'antd';
import { connect } from 'react-redux';
import {DeleteReminder} from './Actions';
import {isReminderBetween5Days, isReminderInThePast} from '../../util';
import WeatherModal from './WeatherModal';

const { Text } = Typography;

class Reminder extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			showWeather: false
		}
	}

	toggleWeather = () => this.setState((prevState) => ({showWeather: !prevState.showWeather}));

	render() {
		const {reminder, deleteReminder, editReminder} = this.props;
		const {showWeather} = this.state;

		return (
			<Row className="reminder" style={{background: `${reminder.color.hex}63`}}>

				<Tooltip title="Show Weather">
					<Col span={2}>
						{isReminderBetween5Days(reminder.date) && <Icon type="cloud" style={{width: '100%'}} onClick={this.toggleWeather}/>}
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
					{isReminderInThePast(reminder.date) && <Icon type="edit" onClick={() => editReminder(reminder)}/>}
				</Col>
				<Col span={2} className="actions">
					<Icon type="delete" onClick={() => deleteReminder(reminder)}/>
				</Col>
				<WeatherModal show={showWeather} close={this.toggleWeather} date={reminder.date} cityId={reminder.city}/>
			</Row>	
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteReminder: (reminder) => dispatch(DeleteReminder(reminder))
	};
};

export default connect(null, mapDispatchToProps)(Reminder);
