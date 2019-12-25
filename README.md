***Calendar Code Challenge***

__Espects__

| Description   | Version|
| :---:   | :---: |   
| React | ^16.4.1 |
| Redux     |^4.0.0 |
| Moment Js     | ^2.24.0 |
| AXIOS     | ^0.19.0 |
| Lodash     | ^4.17.15 |
| Ant Design     | ^3.26.3 |
| Jest     | ^24.9.0 |
| Open Weather     | 2.5.0 |

__Description__

It's a simple calendar with the ability of adding reminders for a especific day.
The main challenge was managing the data without a database or API to have a Cruds for the reminders, I ended up adding an id everytime I add a reminder to mantain a reference when I'm about to edit or delete.

__Reminder Object__

| key   | value|
| :---:   | :---: | 
| label | String |
| date     | Moment Object |
| city     | Number |
| color     | Object|

__Core features__

- [x] Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city. 
- [x]  Display reminders on the calendar view in the correct time order. 
- [x]  Allow the user to select color when creating a reminder and display it appropriately. 
- [x]  Ability to edit reminders – including changing text, city, day, time and color. 
- [ ]  Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city. 
- [x]  Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city. 

__Bonus Features__

- [x] Expand the calendar to support more than the current month. 
- [x] Properly handle overflow when multiple reminders appear on the same date. 
- [x] Functionality to delete one or ALL the reminders for a specific day 

__Features To-Do__

- Add the correct weather to each reminder, currently the api just let me get the weather for a list cities but I can't especify the date, at least in the fee tier version of Open Weather.

__To Run__

```
npm i
```

```
npm start
```

[http://localhost:8080/](http://localhost:8080/)

By Juan Rodrigo Venegas Boesch.
