export const API = {
  baseUrl: 'https://health-fine-app.herokuapp.com/api/',
  loginApiMedhod: 'authentication/login',
  registerApiMedhod: 'authentication/register',
  doctorProfilesApiMedhod: 'profile/doctorProfiles',
  getMasterApiMedhod: 'category/getCategories',
  getPatientProfile: 'profile/patient/getProfile',
  createpatientMedhod: 'profile/patient/createProfile',
  updatepatientMedhod: 'profile/patient/updateProfile',
  createcaseMethod: 'case/createCase',
  geyMyCasesMethod: 'case/patient/getmycases/pending',
  getSlotssMethod: 'slot/doctor/getSlots',
  initiatePaymentMethod: 'payment/initiatePayment',
  listPaymentTransaction: 'payment/listPaymentTransaction',
  getChatMessagesMethod: 'case/getChatMessages',
  getUpcommingMethod: 'case/patient/getmycases/upcoming',
  getunderreviewMethod: 'case/patient/getmycases/underreview',
  getcompletedMethod: 'case/patient/getmycases/completed',
  getcancelledMethod: 'case/patient/getmycases/cancelled',
  ismyCasevalidMethod: 'case/patient/ismyCasevalid',
  favoritesMethod: 'profile/doctor/favorites',
};
const appApi = {API};

export default appApi;
