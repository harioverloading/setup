import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
} from '../redux/reducer';
import {createCase} from './createCase';

const axios = require('axios');

export const updatepatient = (
  navigation,
  patientProfile,
  dispatch,
  userinfo,
  data,
) => {
  dispatch(addloading(true));
  var config = {
    method: 'post',
    url: API.baseUrl + API.createpatientMedhod,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
    data: data,
  };
  if (Object.keys(data).length != 0) {
    axios(config)
      .then(function (response) {
        if (response.data.message == 'Data updated successfully!') {
          console.log(response, 'response.data.message');
        }
      })
      .catch(function (error) {
        if (error.response.data.error.message == 'User already exist!') {
          console.log('User already exist!');
          var config = {
            method: 'put',
            url: API.baseUrl + API.updatepatientMedhod,
            headers: {
              Authorization: 'Bearer ' + userinfo.token,
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              console.log(response);
              dispatch(addloading(false));

              if (response.data.message == 'Data updated successfully!') {
              }
            })

            .catch(function (error) {
              dispatch(addloading(false));
              console.log(error.response);
            });
        }
      });
  } else {
    console.log('no updation', data);
    dispatch(addloading(false));
  }
};
