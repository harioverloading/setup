import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  addcase,
  adduserinfo,
  adddoctorProfileList,
  addslotbookedloading,
} from '../redux/reducer';
import {payment} from '../api/payment';
import moment from 'moment';
const axios = require('axios');

export const createCase = (
  navigation,
  patientProfile,
  dispatch,
  userinfo,
  Alert,
  doctor,
  caseDetails,
) =>
  // navigation,
  // patientProfile,
  // dispatch,
  // userinfo,
  // Alert,
  // doctor,
  {
    dispatch(addloading(true));
    // dispatch(addloading(true));
    // console.log(patientProfile);
    // const gohome = () => {
    //   navigation.navigate('Home');
    // };
    // console.log(caseDetails[0].payment.amount);
    const gohome = (x) => {};
    var data = JSON.stringify({
      doctorAuthenticationId: caseDetails[0].doctorAuthenticationId,
      modeType: caseDetails[0].modeType,
      query:
        caseDetails[0].query.length == 0 ? 'no query' : caseDetails[0].query,
      caseDesc: 'i"m having problrm',
      alottedSlot: caseDetails[0].alottedSlot,
      alottedSlotAt: caseDetails[0].alottedSlotAt,
      payment: {
        amount: caseDetails[0].payment.amount,
      },
    });

    var config = {
      method: 'post',
      url: API.baseUrl + API.createcaseMethod,
      headers: {
        Authorization: 'Bearer ' + userinfo.token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(addloading(false));
        payment(
          navigation,
          patientProfile,
          dispatch,
          userinfo,
          Alert,
          doctor,
          caseDetails,
          response.data.data.id,
        );
        dispatch(
          addslotbookedloading({
            active: true,
            type: response.data.data.mrno,
            msg: 'Dr. ' + doctor.name,
          }),
        );
        // setTimeout(function () {
        //   dispatch(
        //     addslotbookedloading({
        //       active: false,
        //       type: response.data.data.mrno,
        //       msg: 'Dr. ' + doctor.name,
        //     }),
        //   );
        // gohome(response.data.data.id);
        // }, 4000);
      })
      .catch(function (error) {
        dispatch(addloading(false));
        console.log(error.response);
      });
  };
