import {Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '../../theme/theme';
export default function LoginScreen(props) {
  return (
    <TouchableWithoutFeedback>
      <View>
        <Text
          style={{
            fontFamily: FONTS.fontFamily1,
            color: COLORS.primary,
            fontSize: SIZES.s1,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily2,
            color: COLORS.primary,
            fontSize: SIZES.s2,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily3,
            color: COLORS.primary,
            fontSize: SIZES.s3,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily4,
            color: COLORS.primary,
            fontSize: SIZES.s4,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily5,
            color: COLORS.primary,
            fontSize: SIZES.s4,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily1i,
            color: COLORS.primary,
            fontSize: SIZES.s1,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily2i,
            color: COLORS.primary,
            fontSize: SIZES.s2,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily3i,
            color: COLORS.primary,
            fontSize: SIZES.s3,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily4i,
            color: COLORS.primary,
            fontSize: SIZES.s4,
          }}>
          isithora-ISITHORA
        </Text>
        <Text
          style={{
            fontFamily: FONTS.fontFamily5i,
            color: COLORS.primary,
            fontSize: SIZES.s4,
          }}>
          isithora-ISITHORA
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
