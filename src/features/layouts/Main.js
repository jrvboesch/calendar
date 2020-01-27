import React, { Component } from 'react';
import { Layout } from 'antd';
import moment from 'moment';

const { Content, Footer } = Layout;

class Main extends Component {
	render() {
		return (
			<Layout className="mainLayout">
				<Content className="content">
					{this.props.children}
				</Content>
				 <Footer style={{ textAlign: 'center' }}>
					Juan Rodrigo Venegas Boesch {moment().format("YYYY")}
				</Footer>
			</Layout>
		);
	}
}

export default Main;