import {API} from '../api';
import {
  addBackGroundColor,
  addloading,
  addmycases,
  adduserinfo,
  adddoctorProfileList,
  addismycasevalid,
} from '../../redux/reducer';

const axios = require('axios');

export const ismycasevalidApi = (dispatch, userinfo, id) => {
  dispatch(addloading(true));
  console.log('123');
  var config = {
    method: 'get',
    url: API.baseUrl + API.ismyCasevalidMethod + '?id=' + id,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
      'Content-Type': 'application/json',
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response, 'ismyCasevalidMethod');
      dispatch(addismycasevalid(response.data.data));
      dispatch(addloading(false));
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response);
    });
};
