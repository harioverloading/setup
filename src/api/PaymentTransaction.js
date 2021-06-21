import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addslot,
  adddoctorProfileList,
  addlistPaymentTransaction,
} from '../redux/reducer';
import moment from 'moment';
const axios = require('axios');

export const PaymentTransaction = (
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

  var config = {
    method: 'get',
    url: API.baseUrl + API.listPaymentTransaction + '?id=' + x.id,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  let slotarray = [];
  let dateearray = [];
  axios(config)
    .then(function (response) {
      dispatch(addlistPaymentTransaction(response.data));
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
};
