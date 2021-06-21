import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addselectedDoctor,
  adddoctorProfileList,
} from '../redux/reducer';

const axios = require('axios');

export const favoritesApi = (
  userinfo,
  specialisationcode,
  dispatch,
  navigation,
  useSelector,
) => {
  dispatch(addloading(true));
  console.log(userinfo);
  var config = {
    method: 'get',
    url: API.baseUrl + API.favoritesMethod,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response, 'data1');
      dispatch(adddoctorProfileList(response.data.data));
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response, error, 'error1');
    });
};
