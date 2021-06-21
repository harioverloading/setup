export const ADD_BACKGROUND_COLOR = 'ADD_BACKGROUND_COLOR';
export const ADD_LOADING = 'ADD_LOADING';
export const ADD_USERINFO = 'ADD_USERINFO';
export const ADD_DOCTORPROFILELIST = 'ADD_DOCTORPROFILELIST';
export const ADD_MASTERDATA = 'ADD_MASTERDATA';
export const ADD_SELECTEDDOCTOR = 'ADD_SELECTEDDOCTOR';
export const ADD_PATIENT_PTOFILE = 'ADD_PATIENT_PTOFILE';
export const ADD_CASE = 'ADD_CASE';
export const ADD_MYCASES = 'ADD_MYCASES';
export const ADD_SLOT = 'ADD_SLOT';
export const ADD_USERCRED = 'ADD_USERCRED';
export const ADD_SPECIELISATION = 'ADD_SPECIELISATION';
export const ADD_DROPDOWNALERT = 'ADD_DROPDOWNALERT';
export const ADD_EXITS_PTOFILE = 'ADD_EXITS_PTOFILE';
export const ADD_LISTPAYMENTTRANSACTION = 'ADD_LISTPAYMENTTRANSACTION';
export const ADD_MESSAGELIST = 'ADD_MESSAGELIST';
export const ADD_CALLLOADING = 'ADD_CALLLOADING';
export const ADD_CALLLOADING1 = 'ADD_CALLLOADING1';
export const LOCAL = 'LOCAL';
export const ISMYCASEVALID = 'ISMYCASEVALID';
export const FCM = 'FCM';
export const addfcmtoken = (Id) => ({
  type: FCM,
  payload: Id,
});
export const addismycasevalid = (Id) => ({
  type: ISMYCASEVALID,
  payload: Id,
});
export const addlocal = (Id) => ({
  type: LOCAL,
  payload: Id,
});
export const addBackGroundColor = (Id) => ({
  type: ADD_BACKGROUND_COLOR,
  payload: Id,
});
export const adddropDownAlert = (Id) => ({
  type: ADD_DROPDOWNALERT,
  payload: Id,
});
export const addspecialisation = (Id) => ({
  type: ADD_SPECIELISATION,
  payload: Id,
});
export const addusercred = (Id) => ({
  type: ADD_USERCRED,
  payload: Id,
});
export const addcase = (Id) => ({
  type: ADD_CASE,
  payload: Id,
});
export const addloading = (Id) => ({
  type: ADD_LOADING,
  payload: Id,
});
export const adduserinfo = (Id) => ({
  type: ADD_USERINFO,
  payload: Id,
});
export const adddoctorProfileList = (Id) => ({
  type: ADD_DOCTORPROFILELIST,
  payload: Id,
});
export const addmasterdata = (Id) => ({
  type: ADD_MASTERDATA,
  payload: Id,
});
export const addselectedDoctor = (Id) => ({
  type: ADD_SELECTEDDOCTOR,
  payload: Id,
});
export const addpatientProfile = (Id) => ({
  type: ADD_PATIENT_PTOFILE,
  payload: Id,
});
export const addexitspatientProfile = (Id) => ({
  type: ADD_EXITS_PTOFILE,
  payload: Id,
});
export const addmycases = (Id) => ({
  type: ADD_MYCASES,
  payload: Id,
});
export const addslot = (Id) => ({
  type: ADD_SLOT,
  payload: Id,
});
export const addlistPaymentTransaction = (Id) => ({
  type: ADD_LISTPAYMENTTRANSACTION,
  payload: Id,
});
export const addMessagelist = (Id) => ({
  type: ADD_MESSAGELIST,
  payload: Id,
});
export const addcallloading = (Id) => ({
  type: ADD_CALLLOADING,
  payload: Id,
});
export const addslotbookedloading = (Id) => ({
  type: ADD_CALLLOADING1,
  payload: Id,
});
const initialState = {
  usercred: {token: true, splash: true, initial: true},
  specialisation: [],
  customColor: '#394C98',
  loading: false,
  userinfo: {},
  doctorProfileList: {},
  masterdata: {},
  selectedDoctor: -1,
  patientProfile: {
    name: '',
    mobile: '',
    email: '',
    height: '',
    weight: '',
    age: '',
    dob: '',
    sex: 'male',
    language: [],
  },
  caseDetails: {
    doctorAuthenticationId: '',
    modeType: '',
    query: '',
    alottedSlot: '',
    payment: {
      amount: '',
    },
  },
  mycases: null,
  slots: [],
  dropDownAlert: {active: 'false', type: 'error', msg: 'error occured!!'},
  exitspatientProfile: null,
  listPaymentTransaction: '',
  Messagelist: null,
  callloading: {active: false, answer: false, msg: ''},
  slotbookedloading: {active: false, type: 'booking...', msg: ''},
  local: null,
  ismycasevalid: {
    textInput: false,
    attachmentInput: false,
    allowConsult: false,
    help: false,
  },
  fcmTokenvalue: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FCM:
      return {
        ...state,
        fcmTokenvalue: action.payload,
      };
    case ADD_MESSAGELIST:
      return {
        ...state,
        Messagelist: action.payload,
      };
    case ISMYCASEVALID:
      return {
        ...state,
        ismycasevalid: action.payload,
      };
    case LOCAL:
      return {
        ...state,
        local: action.payload,
      };
    case ADD_CALLLOADING:
      return {
        ...state,
        callloading: action.payload,
      };
    case ADD_CALLLOADING1:
      return {
        ...state,
        slotbookedloading: action.payload,
      };
    case ADD_BACKGROUND_COLOR:
      return {
        ...state,
        customColor: action.payload,
      };
    case ADD_USERCRED:
      return {
        ...state,
        usercred: action.payload,
      };
    case ADD_DROPDOWNALERT:
      return {
        ...state,
        dropDownAlert: action.payload,
      };
    case ADD_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_USERINFO:
      return {
        ...state,
        userinfo: action.payload,
      };
    case ADD_SLOT:
      return {
        ...state,
        slots: action.payload,
      };
    case ADD_DOCTORPROFILELIST:
      return {
        ...state,
        doctorProfileList: action.payload,
      };
    case ADD_PATIENT_PTOFILE:
      return {
        ...state,
        patientProfile: action.payload,
      };
    case ADD_EXITS_PTOFILE:
      return {
        ...state,
        exitspatientProfile: action.payload,
      };
    case ADD_CASE:
      return {
        ...state,
        caseDetails: action.payload,
      };
    case ADD_MASTERDATA:
      return {
        ...state,
        masterdata: action.payload,
      };
    case ADD_SELECTEDDOCTOR:
      return {
        ...state,
        selectedDoctor: action.payload,
      };
    case ADD_MYCASES:
      return {
        ...state,
        mycases: action.payload,
      };
    case ADD_SPECIELISATION:
      return {
        ...state,
        specialisation: action.payload,
      };
    case ADD_LISTPAYMENTTRANSACTION:
      return {
        ...state,
        listPaymentTransaction: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
