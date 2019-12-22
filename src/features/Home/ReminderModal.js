import React from 'react';
import {Modal, Form} from 'antd';
import moment from 'moment';
import ReminderForm from './ReminderForm';

class ReminderModal extends React.Component {
	constructor(props) {
		super(props);
	}

	onOk = () => {
		const {form} = this.props;
		form.validateFields((errors, values) => {
			console.log(values)
		});
	};

	render() {
		const {show, save, close, reminderDay, form} = this.props;

		return (
			<Modal
				title="New reminder"
				visible={show}
				onOk={this.onOk}
				onCancel={close}
				destroyOnClose={true}
			>
				<ReminderForm 
					reminderDay={reminderDay}
					form={form}
				/>
			</Modal>
		);
	}
}

export default Form.create()(ReminderModal);
