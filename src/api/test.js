const axios = require('axios');

export const Testapi = () => {
  const doctors = {
    name: 'Indrani Dutta',
    age: 28,
    sex: 'female',
    language: ['Tamil', 'Engilsh'],
    degree: '605f9bacd213a92384483919',
    specialisations: '605f8c939f70c63338078255',
    regno: 'DOC-000015',
    hospitalId: 'HOS-000001',
    state: 'tamilnadu',
    city: 'chennai',
    pincode: '612104',
    address: 'N0, 1, North west road',
    mobile: '1234567888',
    email: 'test83@test.com',
    workingHours: '9 AM to 9 PM',
    experience: '3',
    about:
      'A dedicated and caring Psychiatry with several years of experience in clinical practice helping patients on a daily basis.',
    qualification: [
      {
        degree: '605f9b65c9ffb3428cd4d16b',
        institution: 'Medical College, Tricy',
        specialisation: '6062e940e364390015007dd5',
      },
      {
        degree: '605f9bacd213a92384483919',
        institution: 'Medical College, Chennai',
        specialisation: '605f8c939f70c63338078255',
      },
    ],
  };
  var data = {
    username: doctors.mobile,
    password: '12345678',
    name: doctors.name,
    email: doctors.email,
    userrole: 'Doctor',
  };
  var config = {
    method: 'post',
    url: 'https://health-fine-app.herokuapp.com/api/authentication/register',
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
      var data = {
        username: doctors.mobile,
        password: '12345678',
      };

      var config = {
        method: 'post',
        url: 'https://health-fine-app.herokuapp.com/api/authentication/login',
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data.token);
          var config = {
            method: 'post',
            url:
              'https://health-fine-app.herokuapp.com/api/profile/doctor/createProfile',
            headers: {
              Authorization: 'Bearer ' + response.data.token,
              'Content-Type': 'application/json',
            },
            data: doctors,
          };

          axios(config)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error.response);
            });
        })
        .catch(function (error) {
          console.log(error.response);
        });
    });
};
