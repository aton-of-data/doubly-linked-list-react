import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppPressable } from '@/components/atoms/AppPressable';
import { AppText } from '@/components/atoms/AppText';
import { AppTextInput } from '@/components/atoms/AppTextInput';
import { ScreenContainer } from '@/components/atoms/ScreenContainer';
import { LinkedListVisualization } from './LinkedListVisualization';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { StatRow } from '@/components/molecules/StatRow';
import { useDoublyLinkedList } from '@/hooks/useDoublyLinkedList';
import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { ddlLog } from '@/utils/ddlLog';

export function DoublyLinkedListScreen() {
  const { state, actions, view } = useDoublyLinkedList();

  const canInsert = useMemo(() => state.draftValue.trim().length > 0, [state.draftValue]);

  return (
    <ScreenContainer>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <AppText variant="title" style={styles.heroTitle}>
            Doubly linked list
          </AppText>
          <AppText variant="muted" style={styles.heroSubtitle}>
            Type a value, then insert. Cards show <AppText style={styles.mono}>prev</AppText> /{' '}
            <AppText style={styles.mono}>next</AppText> so the structure stays obvious.
          </AppText>

          <View style={styles.section}>
            <SectionHeader title="List state" />
            <View style={styles.card}>
              <StatRow label="Size" value={String(view.size)} valueTestID="stat-size" />
              <StatRow label="Head" value={view.headLabel} valueTestID="stat-head" />
              <StatRow label="Tail" value={view.tailLabel} valueTestID="stat-tail" />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Structure (head → tail)" />
            <View style={[styles.card, styles.visualCard]}>
              <LinkedListVisualization
                nodes={view.orderedNodes}
                headId={state.headId}
                tailId={state.tailId}
              />
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Add nodes" />
            <AppTextInput
              testID="node-value-input"
              value={state.draftValue}
              onChangeText={(text) => {
                ddlLog('input', 'onChangeText', {
                  length: text.length,
                  preview: text.length > 40 ? `${text.slice(0, 40)}…` : text,
                });
                actions.setDraft(text);
              }}
              placeholder="Type node value, then insert below…"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
            {!canInsert ? (
              <AppText variant="muted" style={styles.hint}>
                Insert head / tail are disabled until this field has non-whitespace text — that matches what the
                reducer expects.
              </AppText>
            ) : null}
            <View style={styles.actions}>
              <AppPressable
                label="Insert head"
                disabled={!canInsert}
                onPress={actions.insertHead}
                style={styles.actionGrow}
              />
              <AppPressable
                label="Insert tail"
                variant="secondary"
                disabled={!canInsert}
                onPress={actions.insertTail}
                style={styles.actionGrow}
              />
            </View>
            <AppPressable label="Reset list" variant="secondary" onPress={actions.reset} />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Order (compact)" />
            <View style={styles.card}>
              {view.orderedValues.length === 0 ? (
                <AppText testID="list-order-empty" variant="muted">
                  Empty list — insert a value to get started.
                </AppText>
              ) : (
                <AppText testID="list-order" variant="body">
                  {view.orderedValues.join('  →  ')}
                </AppText>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  heroTitle: {
    marginTop: spacing.sm,
  },
  heroSubtitle: {
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  mono: {
    fontFamily: 'Menlo',
    color: colors.accent,
  },
  section: {
    gap: spacing.md,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  visualCard: {
    paddingVertical: spacing.md,
    minHeight: 120,
  },
  hint: {
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionGrow: {
    flex: 1,
  },
});
