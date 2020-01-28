import React from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'antd';
import {WeatherWidget} from './WeatherWidget';
import {GetCityWeather, GetCurrentWeather} from './Actions';
import moment from 'moment';

export class WeatherModal extends React.Component {
  render() {
    const {show, close, date, cityId, getCityWeather, getCurrentWeather} = this.props;
    return (
      <Modal
        title={`Weather for ${moment(date).format("MMMM DD")}`}
        visible={show}
        onCancel={close}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={close}>
						Close
          </Button>
        ]}
      >
        <WeatherWidget date={date} cityId={cityId} getCityWeather={getCityWeather} getCurrentWeather={getCurrentWeather}/>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCityWeather: (cityId, date) => dispatch(GetCityWeather(cityId, date)),
    getCurrentWeather: (cityId, date) => dispatch(GetCurrentWeather(cityId, date))
  };
};

export default connect(null, mapDispatchToProps)(WeatherModal);
