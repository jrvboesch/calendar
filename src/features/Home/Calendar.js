import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Row, Col, Card, Typography, Icon, Dropdown, Menu} from 'antd';
import {getCalendarMatrix, isReminderInMonth} from '../../util';
import ReminderModal from './ReminderModal';
import Reminder from './Reminder';
import _ from 'lodash';

const { Title } = Typography;

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		// const current = moment();
		const current = moment("2019/6/1 03:56:00");

		this.state = {
			current,
			show: false,
			reminderDay: 0,
			monthDays: current.daysInMonth(),
			startDay: current.day()
		}
		
	}
	
	save = () => this.setState({show: false, reminderDay: 0});
	
	close = () => this.setState({show: false, reminderDay: 0});

	addReminder = (day) => this.setState({show: true, reminderDay: {...day, day: moment(this.state.current).date(day.day)}});

	render() {
		const {reminders} = this.props;
		
		const {monthDays, current, startDay, show, reminderDay} = this.state;
		
		const monthReminders = _.cloneDeepWith(reminders).filter((reminder) => isReminderInMonth(reminder.date, current))
		
		const calendar = getCalendarMatrix(current).map((day, index) => (
			<div className="day" key={index}>
				<Card 
					title={day.day}
					className={`card ${day.outRange ? "outRange" : ""}`} 
					hoverable
					extra={[
						<Dropdown 
							key="plus"
							overlay={(
								<Menu>
									<Menu.Item key="0">
										<a href="#" onClick= {() => !day.outRange && this.addReminder(day)}>
											New Reminder <Icon type="down" />
										</a>
									</Menu.Item>
									<Menu.Item key="1">
										<a href="http://www.taobao.com/">2nd menu item</a>
									</Menu.Item>
								</Menu>
							)} trigger={['click']}
						>
							<Icon type="down" />
						</Dropdown>
					]}
				>
					<Row>
						{!day.outRange && monthReminders
								.filter((reminder) => moment(reminder.date).isSame(moment(current).date(day.day), 'day'))
								.map((reminder, key) => (
							<Col span={24} key={key}>
								<Reminder reminder={reminder}/>
							</Col>
						))}
					</Row>
				</Card>
			</div>
		));
		return (
			<Col span={16} className="calendar">
				<Col span={24}>
						<div className="monthTitle">
							<Title level={4}>{current.format("MMMM YYYY")}</Title>
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

export default connect(mapStateToProps)(Calendar);
