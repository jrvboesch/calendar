import React from 'react';
import { connect } from 'react-redux';
import {Modal, Form} from 'antd';
import ReminderForm from './ReminderForm';
import {AddReminder, EditReminder} from './Actions';

class ReminderModal extends React.Component {
	onOk = () => {
	  const {form, addReminder, editReminder, save, reminderDay} = this.props;
	  form.validateFields((errors, values) => {
	    if(errors) return;
	    reminderDay && reminderDay.id 
	      ? editReminder({...values, id: reminderDay.id})
	      : addReminder(values);
	    save(values.city);
	  });
	};

	render() {
	  const {show, close, reminderDay, form} = this.props;
	  return (
	    <Modal
	      title={reminderDay && reminderDay.id ? "Edit Reminder" : "New Reminder"}
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
    addReminder: (reminder) => dispatch(AddReminder(reminder)),
    editReminder: (reminder) => dispatch(EditReminder(reminder))
  };
};


export default connect(null, mapDispatchToProps)(Form.create()(ReminderModal));
