import {API} from '../api/api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addselectedDoctor,
  adddoctorProfileList,
  addexitspatientProfile,
} from '../redux/reducer';

const axios = require('axios');

export const SearchDoctorProfile = (
  userinfo,
  specialisationcode,
  dispatch,
  navigation,
  useSelector,
  page,
) => {
  dispatch(addloading(true));
  console.log(userinfo);
  var config = {
    method: 'get',
    url:
      API.baseUrl +
      API.doctorProfilesApiMedhod +
      '?page=' +
      page +
      '&size=5&specialisations=' +
      specialisationcode,
    headers: {
      Authorization: 'Bearer ' + userinfo.token,
    },
  };
  axios(config)
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response);
      dispatch(adddoctorProfileList(response.data.data.data));
      dispatch(addexitspatientProfile(response.data.data));

      navigation.navigate('Doctors');
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response, error, 'error1');
    });
};
