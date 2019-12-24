import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Row, Col, Card, Typography, Icon, Dropdown, Menu} from 'antd';
import {getCalendarMatrix, isReminderInMonth} from '../../util';
import ReminderModal from './ReminderModal';
import Reminder from './Reminder';
import _ from 'lodash';
import {RemoveAllReminders, GetWeather} from './Actions';

const { Title } = Typography;

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		const current = moment().date(1);

		this.state = {
			current,
			show: false,
			reminderDay: undefined
		};
		props.getWeather(_.cloneDeepWith(props.reminders)
				.filter((reminder) => isReminderInMonth(reminder.date, current))
				.map((reminder) => Number(reminder.city))
		);
	}
	
	nextMonth = () => this.setState((prevState) => {
		const {getWeather, reminders} = this.props;

		getWeather(_.cloneDeepWith(reminders)
				.filter((reminder) => isReminderInMonth(reminder.date, prevState.current))
				.map((reminder) => reminder.id)
		);

		return {
			current: moment(prevState.current).add(1, "month")
		}
	});

	previewsMonth = () => this.setState((prevState) => ({
		current: moment(prevState.current).subtract(1, "month")
	}));

	save = () => this.setState({show: false, reminderDay: undefined});
	
	close = () => this.setState({show: false, reminderDay: undefined});

	addReminder = (day) => this.setState({show: true, reminderDay: {...day, day: moment(this.state.current).date(day.day)}});

	editReminder = (day) => this.setState({show: true, reminderDay: {...day, day: moment(day.date)}});

	removeReminders = (day) => {
		const {removeAllReminders} = this.props;
		removeAllReminders(moment(this.state.current).date(day.day));
	};

	render() {
		const {reminders} = this.props;
		
		const {current, show, reminderDay} = this.state;
		
		const monthReminders = _.cloneDeepWith(reminders).filter((reminder) => isReminderInMonth(reminder.date, current))

		const calendar = getCalendarMatrix(current).map((day, index) => (
			<div className="day" key={index}>
				<Card 
					title={day.day}
					className={`card ${day.outRange ? "outRange" : ""}`} 
					hoverable
					extra={[
						(!day.outRange && <Dropdown 
							key="plus"
							overlay={(
								<Menu>
									<Menu.Item key="0">
										<a href="#" onClick= {() => !day.outRange && this.addReminder(day)}>
											New Reminder
										</a>
									</Menu.Item>
									<Menu.Item key="1">
										<a href="#" onClick= {() => !day.outRange && this.removeReminders(day)}>
											Clear Reminders
										</a>
									</Menu.Item>
								</Menu>
							)} trigger={['click']}
						>
							<Icon type="down" />
						</Dropdown>)
					]}
				>
					<Row>
						{!day.outRange && _.sortBy(
								monthReminders.filter((reminder) => moment(reminder.date).isSame(moment(current).date(day.day), 'day')),
									(reminder) => moment(reminder.date)
							)
							.map((reminder, key) => (
									<Col span={24} key={key}>
										<Reminder reminder={reminder} editReminder={this.editReminder}/>
									</Col>
								)
							)
						}
					</Row>
				</Card>
			</div>
		));
		return (
			<Col span={24} className="calendar">
				<Col span={24}>
						<div className="monthTitle">
							<Icon type="left" className="previewsMonth" onClick={this.previewsMonth}/>
							<Title level={4}>{current.format("MMMM YYYY")}</Title>
							<Icon type="right" className="nextMonth" onClick={this.nextMonth}/>
						</div>
						<div className="dayTitle">Sunday</div>
						<div className="dayTitle">Monday</div>
						<div className="dayTitle">Tuesday</div>
						<div className="dayTitle">Wednesday</div>
						<div className="dayTitle">Thursday</div>
						<div className="dayTitle">Friday</div>
						<div className="dayTitle">Saturday</div>
				</Col>
				<Col span={24}>
					{calendar}
				</Col>
				<ReminderModal 
					show={show}
					reminderDay={reminderDay}
					save={this.save}
					close={this.close}
				/>
			</Col>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		reminders: state.calendar.reminders
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeAllReminders: (reminder) => dispatch(RemoveAllReminders(reminder)),
		getWeather: (reminderIds) => dispatch(GetWeather(reminderIds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
