import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export type AppTextInputProps = TextInputProps;

export function AppTextInput({ style, placeholderTextColor, ...rest }: AppTextInputProps) {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? colors.textMuted}
      style={[styles.input, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    fontSize: typography.body,
  },
});
