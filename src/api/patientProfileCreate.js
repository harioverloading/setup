import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
  addexitspatientProfile,
  addpatientProfile,
  adddropDownAlert,
} from '../redux/reducer';
import {createCase} from './createCase';

const axios = require('axios');

export const create;
patient = (
  navigation,
  patientProfile,
  dispatch,
  userinfo,
  Alert,
  doctor,
  caseDetails,
  exitspatientProfile,
  caseCreation,
) => {
  dispatch(addloading(true));

  var data = {
    name: patientProfile[0].name,
    mobile: patientProfile[0].mobile,
    email: patientProfile[0].email,
    height: patientProfile[0].height,
    weight: patientProfile[0].weight,
    age: patientProfile[0].age,
    dob: '',
    sex: patientProfile[0].sex,
    language: patientProfile[0].language,
  };
  // props.navigation.navigate('Invoice');
  var config = {
    method: 'post',
    url: API.baseUrl + API.createpatientMedhod,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
    data: data,
  };

  dispatch(addloading(false));
  axios(config)
    .then(function (response) {
      if (response.data.message == 'Data updated successfully!') {
        if (caseCreation) {
          createCase(
            navigation,
            patientProfile,
            dispatch,
            userinfo,
            Alert,
            doctor,
            caseDetails,
          );
          console.log(response);
        }
        dispatch(addexitspatientProfile(patientProfile));
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error.response);
      if (error.response.data.error.message == 'User already exist!') {
        var data = {
          name: patientProfile[0].name,
          email: patientProfile[0].email,
          height: patientProfile[0].height,
          weight: patientProfile[0].weight,
          age: patientProfile[0].age,
          sex: patientProfile[0].sex,
        };
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
              if (caseCreation) {
                createCase(
                  navigation,
                  patientProfile,
                  dispatch,
                  userinfo,
                  Alert,
                  doctor,
                  caseDetails,
                );
                console.log(response);
              } else {
              }
              dispatch(addexitspatientProfile(patientProfile));
            }
          })
          .catch(function (error) {
            dispatch(addloading(false));
            dispatch(
              adddropDownAlert({
                active: 'true',
                type: 'error',
                msg: error.response,
              }),
            );
            console.log(error.response);
          });
      }
    });
};
