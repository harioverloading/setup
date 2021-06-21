import {API} from '../api/api';
import {
  addBackGroundColor,
  addloading,
  adduserinfo,
  addmasterdata,
  addpatientProfile,
  addspecialisation,
  addusercred,
  adddropDownAlert,
  addexitspatientProfile,
} from '../redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMasterData} from './GetMasterData';
const axios = require('axios');
export const LoginApi = (
  a,
  dispatch,
  navigation,
  ToastAndroid,
  useSelector,
  patientProfile,
  fcmTokenvalue,
) => {
  console.log(fcmTokenvalue, 'from login');
  dispatch(addloading(true));
  console.log('running login api');
  let a1;
  axios({
    method: 'post',
    url: API.baseUrl + API.loginApiMedhod,
    data: {
      username: a.username,
      password: a.password,
      fcmtoken: fcmTokenvalue,
    },
  })
    .then(function (response) {
      a1 = response.data.data;
      var config = {
        method: 'get',
        url: API.baseUrl + API.getMasterApiMedhod,
        headers: {
          Authorization: 'Bearer ' + response.data.token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response, 'running master api');
          dispatch(addloading(false));
          let a = response.data.data;
          let data = {};
          for (let i = 0; i < a.length; i++) {
            data[a[i].id] = {
              categoryName: a[i].categoryName,
              categoryType: a[i].categoryType,
            };
          }
          dispatch(addmasterdata(data));

          let specialisation = a.filter(function (item) {
            return item.categoryType === 'specialisation';
          });
          console.log(specialisation, 'specialisation');
          dispatch(addspecialisation(specialisation));
        })
        .catch(function (error) {
          console.log(error.response);
        });
      var config = {
        method: 'get',
        url: API.baseUrl + API.getPatientProfile,
        headers: {
          Authorization: 'Bearer ' + response.data.token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log('running patient profile api');
          console.log(a1, 'profile succ');
          dispatch(
            addpatientProfile({
              name: a1.name,
              mobile: a1.username,
              email: a1.email,
              height: '',
              weight: '',
              age: '',
              dob: '',
              sex: '',
              language: [],
            }),
          );
          if (response.data.message == 'No data found!') {
            let temp = [
              {
                name: a1.name,
                mobile: a1.username,
                email: a1.email,
                height: '',
                weight: '',
                age: '',
                dob: '',
                sex: '',
                language: [],
              },
            ];
            dispatch(addpatientProfile(temp));
            dispatch(addexitspatientProfile(temp));
          } else {
            console.log(response.data.data, 'dad');
            let pf = response.data.data[0];
            console.log(pf, 'pf');
            let temp = [
              {
                id: pf.id,
                authenticationId: pf.authenticationId,
                name: pf.name,
                mobile: pf.mobile,
                email: pf.email,
                height: pf.height,
                weight: pf.weight,
                age: pf.age,
                dob: '',
                sex: pf.sex,
                language: pf.language,
              },
            ];
            dispatch(addpatientProfile(temp));
            dispatch(addexitspatientProfile(temp));
          }
        })
        .catch(function (error) {
          console.log(error, 'errror');
        });
      console.log(response.data, 'login succ');

      if (
        response.data.message ==
        'Logged in successfully and device got registered!'
      ) {
        const storeData = async (value) => {
          try {
            const jsonValue = JSON.stringify(a);
            await AsyncStorage.setItem('@storage_Key', jsonValue);
          } catch (e) {
            console.log(e);
          }
        };
        storeData();

        const getData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key');
            console.log(jsonValue, 'async');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch (e) {
            // error reading value
          }
        };
        getData();
        dispatch(adduserinfo(response.data));
        dispatch(addusercred({token: false, splash: false}));
        // navigation.navigate('Details1');
      }
      if (response.data.message == 'No User found!') {
        ToastAndroid.showWithGravityAndOffset(
          'No User found',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response, error, 'errorLogin');
      if (
        error.response.data.error.message ==
        'Unauthorized! Invalid username or password.'
      ) {
        ToastAndroid.showWithGravityAndOffset(
          'Invalid username or password',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
      dispatch(addloading(false));
    });
  return;
};
export const RegisterApi = (a, dispatch, navigation, ToastAndroid) => {
  dispatch(addloading(true));
  axios({
    method: 'post',
    url: API.baseUrl + API.registerApiMedhod,
    data: a,
  })
    .then(function (response) {
      dispatch(addloading(false));
      console.log(response.data.message);
      if (response.data.message == 'Data inserted successfully') {
        dispatch(
          adddropDownAlert({
            active: 'true',
            type: 'success',
            msg: 'Successful Registration',
          }),
        );
        navigation.navigate('Login');
      }
    })
    .catch(function (error) {
      dispatch(addloading(false));
      console.log(error.response, 'error1');
      dispatch(
        adddropDownAlert({
          active: 'true',
          type: 'error',
          msg: error.response.data.error.message.replace(
            'Validation error: ',
            '',
          ),
        }),
      );
    });
};
