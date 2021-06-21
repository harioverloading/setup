import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
  addMessagelist,
} from '../redux/reducer';
import moment from 'moment';

const axios = require('axios');

export const getChatMessages = (userinfo, dispatch, id) => {
  dispatch(addloading(true));
  console.log(userinfo);
  var config = {
    method: 'get',
    url: API.baseUrl + API.getChatMessagesMethod + '?id=' + id,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  const temp = [];
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response.data.data[0].message);
      response.data.data[0].message.map((x) => {
        temp.push({
          sender: x.actionBy._id,
          message: x.message,
          time: moment(x.createdAt).format('hh:mm:ss A'),
        });
      });
      dispatch(addMessagelist(temp));
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error, 'error1');
    });
};
