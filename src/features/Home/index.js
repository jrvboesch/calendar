import React from 'react';
import Calendar from './Calendar';
import {Row, Col, Typography} from 'antd';

const { Title } = Typography;

class Home extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Row type="flex" justify="center">
				<Col span={24} className="homeTitle">
					<Title> My Calendar</Title>
				</Col>
				<Calendar />
			</Row>
		);
	}
};


export default Home;








