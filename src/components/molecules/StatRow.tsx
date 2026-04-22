import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';

type StatRowProps = {
  label: string;
  value: string;
  /** Optional hook for integration tests (value cell only). */
  valueTestID?: string;
};

export function StatRow({ label, value, valueTestID }: StatRowProps) {
  return (
    <View style={styles.row}>
      <AppText variant="muted" style={styles.label}>
        {label}
      </AppText>
      <AppText variant="body" style={styles.value} numberOfLines={2} testID={valueTestID}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    flexShrink: 0,
    minWidth: 72,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
});
