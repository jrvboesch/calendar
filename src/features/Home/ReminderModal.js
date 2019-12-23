import React from 'react';
import { connect } from 'react-redux';
import {Modal, Form} from 'antd';
import moment from 'moment';
import ReminderForm from './ReminderForm';
import {AddReminder} from './Actions';

class ReminderModal extends React.Component {
	constructor(props) {
		super(props);
	}

	onOk = () => {
		const {form, addReminder, close} = this.props;
		form.validateFields((errors, values) => {
			if(errors) return;
			addReminder(values);
			close();
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

const mapDispatchToProps = (dispatch) => {
	return {
		addReminder: (reminder) => dispatch(AddReminder(reminder))
	};
};


export default connect(null, mapDispatchToProps)(Form.create()(ReminderModal));
