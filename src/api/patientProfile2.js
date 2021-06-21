import {API} from './api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  adddoctorProfileList,
} from '../redux/reducer';
import {createCase} from '../api/createCase';

const axios = require('axios');

export const updatepatient = (
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
  const gohome = () => {
    navigation.navigate('Home');
  };
  console.log(
    exitspatientProfile[0].name != patientProfile[0].name,
    exitspatientProfile[0].email != patientProfile[0].email,
    Number(exitspatientProfile[0].weight) != Number(patientProfile[0].weight),
    Number(exitspatientProfile[0].height) != Number(patientProfile[0].height),
    Number(exitspatientProfile[0].age) != Number(patientProfile[0].age),
    exitspatientProfile[0].sex != patientProfile[0].sex,
  );
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
  // if (
  //   (exitspatientProfile[0].name != patientProfile[0].name,
  //   exitspatientProfile[0].email != patientProfile[0].email,
  //   Number(exitspatientProfile[0].weight) != Number(patientProfile[0].weight),
  //   Number(exitspatientProfile[0].height) != Number(patientProfile[0].height),
  //   Number(exitspatientProfile[0].age) != Number(patientProfile[0].age),
  //   exitspatientProfile[0].sex != patientProfile[0].sex)
  // ) {
  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));

      if (response.data.message == 'Data updated successfully!') {
        createCase(
          navigation,
          patientProfile,
          dispatch,
          userinfo,
          Alert,
          doctor,
          caseDetails,
        );
        console.log(doctor, 'doctor');
      }
    })
    .catch(function (error) {
      console.log(patientProfile);
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
              if (caseDetails) {
                createCase(
                  navigation,
                  patientProfile,
                  dispatch,
                  userinfo,
                  Alert,
                  doctor,
                  caseDetails,
                );
              }
            }
          })

          .catch(function (error) {
            dispatch(addloading(false));
            createCase(
              navigation,
              patientProfile,
              dispatch,
              userinfo,
              Alert,
              doctor,
              caseDetails,
            );
            console.log(error.response);
          });
      }
    });
  // } else {
  //   console.log('case Creation');
  //   dispatch(addloading(false));
  //   if (caseDetails) {
  //     createCase(
  //       navigation,
  //       patientProfile,
  //       dispatch,
  //       userinfo,
  //       Alert,
  //       doctor,
  //       caseDetails,
  //     );
  //   }
  // }
};
