import React from 'react';
import {Row, Col, Icon} from 'antd';

class Reminder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {reminder} = this.props;
		return (
			<Row className="reminder" style={{background: reminder.color.hex}}>
				<Col span={22} >{reminder.label}</Col>
				<Col span={2} ><Icon type="delete" onClick={(e) => {e.preventDefault(); console.log(reminder.label)}}/></Col>
			</Row>
				
		);
	}
}

export default Reminder;
