import React from 'react';
import { Pressable, type PressableProps, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { ddlLog } from '@/utils/ddlLog';

export type AppPressableProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: PressableProps['style'];
};

export function AppPressable({
  label,
  variant = 'primary',
  style,
  disabled,
  onPress,
  ...rest
}: AppPressableProps) {
  return (
    <Pressable
      {...rest}
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      onPress={(event) => {
        ddlLog('pressable', `onPress "${label}"`, { disabled: Boolean(disabled) });
        onPress?.(event);
      }}
      hitSlop={8}
      style={(pressableState) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressableState.pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style(pressableState) : style,
      ]}
    >
      <View pointerEvents="none">
        <AppText
          variant="caption"
          style={variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel}
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  primary: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
  },
  primaryLabel: {
    color: colors.background,
    fontWeight: '700',
  },
  secondaryLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
