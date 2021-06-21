import {API} from '../api';
import {
  addBackGroundColor,
  addloading,
  addmycases,
  adduserinfo,
  adddoctorProfileList,
  addexitspatientProfile,
} from '../../redux/reducer';

const axios = require('axios');

export const Pending = (dispatch, userinfo, page) =>
  // navigation,
  // patientProfile,
  // dispatch,
  // userinfo,
  // Alert,
  // doctor,
  {
    dispatch(addloading(true));
    console.log(userinfo.token);
    // const gohome = () => {
    //   navigation.navigate('Home');
    // };

    var config = {
      method: 'get',
      url: API.baseUrl + API.geyMyCasesMethod + '?page=' + page + '&size=8',
      headers: {
        Authorization: 'Bearer ' + userinfo.token,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, 'my cases1');
        dispatch(addmycases(response.data.data));
      })
      .catch(function (error) {
        dispatch(addloading(false));
        console.log(error.response);
      });
  };
