import React from 'react';
import {Form, DatePicker, Input} from 'antd';
import moment from 'moment';
import { CirclePicker } from 'react-color';

class ReminderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: undefined
		}
	}

	componentDidMount() {
		const {reminderDay} = this.props;		
		this.onChange({color: reminderDay.color ? reminderDay.color.hex : undefined})
		
	}
	onChange = (color) => this.setState({color})

	render() {
		const {reminderDay, form} = this.props;
		const {color} = this.state;
		 const { getFieldDecorator } = form;
		return (
			<Form>
				<Form.Item label="Label" hasFeedback>
					{
						getFieldDecorator('label', {
							initialValue: reminderDay.label ? reminderDay.label : undefined,
							rules: [{
								required: true,
								message: 'Please input a label!',
							},{
								max: 30,
								message: 'It must be 30 characters long.'
							}],
						})( <Input placeholder="Example: Free Zelda!"/> )
					}
				</Form.Item>
				<Form.Item label="Remind me">
					{
						getFieldDecorator('date',
							{
								initialValue: reminderDay.day,
								rules: [{
									required: true,
									message: 'Please select a date and time!',
								}],
							}
						)(
							<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: "100%"}}/>,
						)
					}
				</Form.Item>
				<Form.Item label="City" hasFeedback>
					{
						getFieldDecorator('city', {
							initialValue: reminderDay.city ? reminderDay.city : undefined,
							rules: [{
								required: true,
								message: 'Please input a City!',
							}],
						})( <Input placeholder="Example: San Pedro Sula"/> )
					}
				</Form.Item>
				<Form.Item label="Color">
					{
						getFieldDecorator('color', {
							initialValue: reminderDay.color ? reminderDay.color : undefined,
							onChange: this.onChange,
							rules: [{
								required: true,
								message: 'Please input a Color!',
							}],
						})( <CirclePicker width="100%" color={color}/> )
					}
				</Form.Item>
			</Form>
		);
	}
}

export default ReminderForm;