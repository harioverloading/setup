import {API} from '../api';
import {
  addBackGroundColor,
  addloading,
  addmycases,
  adduserinfo,
  adddoctorProfileList,
} from '../../redux/reducer';

const axios = require('axios');

export const completedApi = (dispatch, userinfo, page) => {
  dispatch(addloading(true));
  var config = {
    method: 'get',
    url: API.baseUrl + API.getcompletedMethod + '?page=' + page + '&size=8',
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
      'Content-Type': 'application/json',
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response, 'my cases');
      dispatch(addmycases(response.data.data));
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response);
    });
};
