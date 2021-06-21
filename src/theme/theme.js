import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#66D59A', // green
  secondary: '#F6F6F6',
  secondary1: '#eee', // dark green
  grey: '#394C98',
  green: '#66D59A',
  rose: '#F5713E',
  lightGreen: '#E6FEF0',
  black: 'black',
  white: 'white',
  lime: '#00BA63',
  emerald: '#2BC978',
  red2: '#E84143',
  red: '#FF4134',
  lightRed: '#FFF1F0',
  purple: '#6B3CE9',
  lightpurple: '#F3EFFF',
  yellow: '#FFC664',
  lightyellow: '#FFF9EC',
  black: '#434343',
  white: '#FFFFFF',
  lightGray: '#FCFBFC',
  gray: '#C1C3C5',
  darkgray: '#C3C6C7',
  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  s1: 40,
  s2: 30,
  s3: 20,
  s4: 19,
  s5: 18,
  s6: 17,
  s7: 16,
  s8: 15,
  s9: 14,
  s10: 13,
  s11: 12,
  s12: 11,
  s13: 10,
  s14: 9,
  s15: 8,

  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  fontFamily1: 'SFUIText-Heavy',
  fontFamily2: 'SFUIText-Bold',
  fontFamily3: 'SFUIText-Semibold',
  fontFamily3: 'SFUIText-Medium',
  fontFamily4: 'SFUIText-Regular',
  fontFamily5: 'SFUIText-Light',
  fontFamily1i: 'SFUIText-HeavyItalic',
  fontFamily2i: 'SFUIText-BoldItalic',
  fontFamily3i: 'SFUIText-SemiboldItalic',
  fontFamily3i: 'SFUIText-MediumItalic',
  fontFamily4i: 'SFUIText-RegularItalic',
  fontFamily5i: 'SFUIText-LightItalic',
  largeTitle: {
    fontFamily: 'times-new-roman',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'times-new-roman', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'times-new-roman', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'times-new-roman', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'times-new-roman', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'times-new-roman', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'times-new-roman', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'times-new-roman', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'times-new-roman', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'times-new-roman', fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
