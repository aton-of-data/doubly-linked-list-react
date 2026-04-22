import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

import { colors } from '@/theme';

export type ScreenContainerProps = ViewProps;

export function ScreenContainer({ style, ...rest }: ScreenContainerProps) {
  return <View style={[styles.root, style]} {...rest} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
