import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addslot,
  adddoctorProfileList,
} from '../redux/reducer';
import moment from 'moment';
const axios = require('axios');

export const getSlot = (dispatch, navigation, authenticationId, userinfo) => {
  dispatch(addloading(true));

  var config = {
    method: 'get',
    url: API.baseUrl + API.getSlotssMethod + '?id=' + authenticationId,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  let slotarray = [];
  let dateearray = [];
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response);
      let i = -1;
      response.data.data.map((x) => {
        var date = moment(x.slot).local().format('YYYY-MM-DD');
        slotarray[date] = [];

        let index = dateearray.findIndex((x) => x === date);
        if (index == -1) {
          i++;
          dateearray[i] = date;
        }
        console.log(index);
      });
      response.data.data.map((x) => {
        var date = moment(x.slot).local().format('YYYY-MM-DD');
        var time = moment(x.slot).local().format('hh-mm A');
        slotarray[date].push({
          date: date,
          time: time,
          slot: x.slot,
          duration: x.duration,
          amount: x.amount,
          id: x.id,
        });
      });
      console.log(dateearray, slotarray, 'slot');
      dispatch(addslot({time: slotarray, date: dateearray}));
      navigation.navigate('Schedule2');
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error);
    });
};
