import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Col, Card, Typography} from 'antd';
import {getCalendarMatrix} from '../../util';
import ReminderModal from './ReminderModal';

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

	addReminder = (day) => this.setState({show: true, reminderDay: {...day, day: moment(this.state.current).date(day.day), label:"hi", city: "sps", color: {"hsl":{"h":4.105263157894738,"s":0.8962264150943399,"l":0.5843137254901961,"a":1},"hex":"#f44336","rgb":{"r":244,"g":67,"b":54,"a":1},"hsv":{"h":4.105263157894738,"s":0.7786885245901639,"v":0.9568627450980393,"a":1},"oldHue":199.09090909090912,"source":"hex"}}});

	render() {
		const {monthDays, current, startDay, show, reminderDay} = this.state;
		const calendar = getCalendarMatrix(current).map((day, index) => (
			<div className="day" key={index}>
				<Card 
					title={day.day}
					className={`card ${day.outRange ? "outRange" : ""}`} 
					hoverable
					onClick= {() => !day.outRange && this.addReminder(day)}
				>
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

	};
};

export default connect(mapStateToProps)(Calendar);
