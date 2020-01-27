import React from 'react';
import {List, Statistic, Icon} from 'antd';
import moment from 'moment';

export class WeatherWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}

		const {date, cityId, getCityWeather, getCurrentWeather} = props;

		if(moment().isSame(date, 'day'))
			getCurrentWeather(cityId)
				.then((data) => this.setState({data}));
		else
			getCityWeather(cityId, moment(date).format('YYYY-MM-DD'))
				.then((data) => this.setState({data}));
			
	}

	render() {
		const {data} = this.state;

		return (
			<List
				className="weatherList"
				dataSource={data}
				renderItem={item => {
					let {weather, main} = item;
					weather = weather[0];
					return (
						<List.Item key={item.id}>
							<List.Item.Meta
								avatar={
									<img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} style={{width: 60}}/>
								}
								title={weather.main}
								description={moment.unix(item.dt).format("hh:mm a")}
							/>
							<Statistic title="Max" value={(main.temp_min).toFixed(0)} prefix={<Icon type="arrow-up" />} suffix="°C"/>
							<Statistic title="Min" value={(main.temp_max).toFixed(0)} prefix={<Icon type="arrow-down" />} suffix="°C"/>
						</List.Item>
					)
				}}
			/>
		);
	}
}

export default (WeatherWidget);
