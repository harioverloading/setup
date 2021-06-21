import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addslot,
  adddoctorProfileList,
} from '../redux/reducer';
import moment from 'moment';
import {PaymentTransaction} from './PaymentTransaction';
const axios = require('axios');

export const payment = (
  navigation,
  patientProfile,
  dispatch,
  userinfo,
  Alert,
  doctor,
  caseDetails,
  x,
) => {
  dispatch(addloading(true));
  console.log(caseDetails, x);
  var data = {
    caseid: x,
  };
  var config = {
    method: 'post',
    url: API.baseUrl + API.initiatePaymentMethod,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
    data: data,
  };
  let slotarray = [];
  let dateearray = [];
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response);
      setTimeout(function () {
        // `  PaymentTransaction(
        //     navigation,
        //     patientProfile,
        //     dispatch,
        //     userinfo,
        //     Alert,
        //     doctor,
        //     caseDetails,
        //     x,
        //   );
      }, 3000);
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response);
    });
};
