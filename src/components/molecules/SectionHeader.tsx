import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { spacing } from '@/theme/spacing';

type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.root}>
      <AppText variant="subtitle">{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: spacing.sm,
  },
});
