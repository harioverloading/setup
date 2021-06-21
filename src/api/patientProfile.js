import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
  addpatientProfile,
  adddropDownAlert,
} from '../redux/reducer';
import {createCase} from './createCase';
import {getSlot} from './getSlot';

const axios = require('axios');

export const updatepatient = (
  navigation,
  patientProfile,
  dispatch,
  userinfo,
  data,
) => {
  dispatch(addloading(true));
  if (Object.keys(data).length != 0) {
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
        if (response.data.message == 'Data updated successfully!') {
          dispatch(addloading(false));
          if (Object.keys(data).length != 0) {
            let temp = [
              {
                age: data.age ? data.age : patientProfile[0].age,
                authenticationId: data.authenticationId
                  ? data.authenticationId
                  : patientProfile[0].authenticationId,
                dob: data.dob ? data.dob : '',
                email: data.email ? data.email : patientProfile[0].email,
                height: data.height ? data.height : patientProfile[0].height,
                id: patientProfile[0].id,
                language: data.language
                  ? data.language
                  : patientProfile[0].language,
                mobile: patientProfile[0].mobile,
                name: data.name ? data.name : patientProfile[0].name,
                sex: data.sex ? data.sex : patientProfile[0].sex,
                weight: data.weight ? data.weight : patientProfile[0].weight,
              },
            ];
            dispatch(addpatientProfile(temp));
            temp = {};
          }
        }
      })
      .catch(function (error) {
        dispatch(addloading(false));
        console.log(error.response);

        if (error.response.data.error.message == 'Data update failed!') {
          data.language = [];
          data.mobile = patientProfile[0].mobile;
          var config = {
            method: 'post',
            url: API.baseUrl + API.createpatientMedhod,
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
                if (Object.keys(data).length != 0) {
                  let temp = [
                    {
                      age: data.age ? data.age : patientProfile[0].age,
                      authenticationId: data.authenticationId
                        ? data.authenticationId
                        : patientProfile[0].authenticationId,
                      dob: data.dob ? data.dob : '',
                      email: data.email ? data.email : patientProfile[0].email,
                      height: data.height
                        ? data.height
                        : patientProfile[0].height,
                      id: patientProfile[0].id,
                      language: data.language
                        ? data.language
                        : patientProfile[0].language,
                      mobile: patientProfile[0].mobile,
                      name: data.name ? data.name : patientProfile[0].name,
                      sex: data.sex ? data.sex : patientProfile[0].sex,
                      weight: data.weight
                        ? data.weight
                        : patientProfile[0].weight,
                    },
                  ];
                  dispatch(addpatientProfile(temp));
                  temp = {};
                }
              }
            })
            .catch(function (error) {
              dispatch(addloading(false));
              console.log(error.response);
            });
        } else {
          if (error.response.data.error.message) {
            dispatch(
              adddropDownAlert({
                active: 'true',
                type: 'error',
                msg: error.response.data.error.message,
              }),
            );
          }
        }
      });
  } else {
    console.log('no updation', data);
    dispatch(addloading(false));
    if (Object.keys(data).length != 0) {
      let temp = [
        {
          age: data.age ? data.age : patientProfile[0].age,
          authenticationId: data.authenticationId
            ? data.authenticationId
            : patientProfile[0].authenticationId,
          dob: data.dob ? data.dob : '',
          email: data.email ? data.email : patientProfile[0].email,
          height: data.height ? data.height : patientProfile[0].height,
          id: patientProfile[0].id,
          language: data.language ? data.language : patientProfile[0].language,
          mobile: patientProfile[0].mobile,
          name: data.name ? data.name : patientProfile[0].name,
          sex: data.sex ? data.sex : patientProfile[0].sex,
          weight: data.weight ? data.weight : patientProfile[0].weight,
        },
      ];
      dispatch(addpatientProfile(temp));
      temp = {};
    }
  }
};
