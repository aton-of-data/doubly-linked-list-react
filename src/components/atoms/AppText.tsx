import React from 'react';
import { Text, type TextProps, type TextStyle, StyleSheet } from 'react-native';

import { colors } from '@/theme';
import { typography } from '@/theme/typography';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'muted';

export type AppTextProps = TextProps & {
  variant?: Variant;
};

const variantStyles: Record<Variant, TextStyle> = {
  title: { fontSize: typography.title, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: typography.subtitle, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: typography.body, fontWeight: '400', color: colors.textPrimary },
  caption: { fontSize: typography.caption, fontWeight: '500', color: colors.textPrimary },
  muted: { fontSize: typography.caption, fontWeight: '400', color: colors.textMuted },
};

export function AppText({ variant = 'body', style, ...rest }: AppTextProps) {
  return <Text style={[styles.base, variantStyles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0.2,
  },
});
