import React from 'react';
import {Form, DatePicker, Input, Select} from 'antd';
import moment from 'moment';
import { CirclePicker } from 'react-color';
import CITIES from '../../json/cities';

const { Option } = Select;

class ReminderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: undefined
		}
	}

	componentDidMount() {
		const {reminderDay} = this.props;	
		this.onChange(reminderDay.color ? reminderDay.color : undefined)
		
	}
	onChange = (color) => this.setState({color})

	render() {
		const {reminderDay, form} = this.props;
		const {color} = this.state;
		const { getFieldDecorator } = form;

		const cityOptions = CITIES.map((city) => (<Option key={city.id}>{city.name}</Option>))
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
						})( 
							<Select
								showSearch
								style={{ width: '100%' }}
								placeholder="Select a City"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{cityOptions}
							</Select> 
						)
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
						})( <CirclePicker width="100%" color={color ? color.hex : undefined}/> )
					}
				</Form.Item>
			</Form>
		);
	}
}

export default ReminderForm;