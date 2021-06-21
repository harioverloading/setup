import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
} from '../redux/reducer';

const axios = require('axios');

export const GetMasterData = (
  userinfo,
  specialisationcode,
  dispatch,
  navigation,
) => {
  dispatch(addloading(true));
  console.log(userinfo);
  var config = {
    method: 'get',
    url: API.baseUrl + API.doctorProfilesApiMedhod,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response, response.data.data.data);
      dispatch(adddoctorProfileList(response.data.data.data));
      navigation.navigate('Doctors');
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response, 'error1');
    });
};
