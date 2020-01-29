import React from 'react';
import {Form, DatePicker, Input, Select} from 'antd';
import { CirclePicker } from 'react-color';
import CITIES from '../../json/cities';
import _ from 'lodash';

const { Option } = Select;

class ReminderForm extends React.Component {
  constructor(props) {
    super(props);

    const {reminderDay} = props;
    let cities = CITIES.slice(0, 15);

    if(reminderDay.city)
      cities.push(_.find(CITIES, {id: Number(reminderDay.city)}));

    this.state = {
      color: undefined,
      cities: _.uniqBy(cities, "id")
    };
    this.onCitySearch = _.debounce(this.onCitySearch, 300);

  }

  componentDidMount() {
    const {reminderDay} = this.props;	
    this.onChange(reminderDay.color ? reminderDay.color : undefined);
		
  }
	onChange = (color) => this.setState({color});

	onCitySearch = (search) => this.setState(() => {
	  const {reminderDay} = this.props;
		
	  let cities = search.length > 0 
	    ? CITIES.filter((city) => city.name.toLowerCase().includes(search)).slice(0, 15)
	    : CITIES.slice(0, 15);
	  if(reminderDay.city)
	    cities.push(_.find(CITIES, {id: Number(reminderDay.city)}));
	  return {
      		cities: _.uniqBy(cities, "id")
	  };
	});

	render() {
	  const {reminderDay, form} = this.props;
	  const {color, cities} = this.state;
	  const { getFieldDecorator } = form;

	  const cityOptions = cities.map((city) => (<Option key={city.id}>{city.name}</Option>));
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
	              onSearch={this.onCitySearch}
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