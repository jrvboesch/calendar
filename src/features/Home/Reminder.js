import React from 'react';
import {Row, Col, Icon} from 'antd';
import { connect } from 'react-redux';
import {DeleteReminder} from './Actions';

class Reminder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {reminder, deleteReminder} = this.props;
		return (
			<Row className="reminder" style={{background: `${reminder.color.hex}63`}}>
				<Col span={22}>
					{reminder.label}
				</Col>
				<Col span={2} className="actions">
					<Icon type="delete" onClick={() => deleteReminder(reminder)}/>
				</Col>
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
