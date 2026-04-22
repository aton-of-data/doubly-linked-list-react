import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import type { OrderedListNode } from '@/domain/doublyLinkedList';
import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';

export type ListNodeRole = 'solo' | 'head' | 'middle' | 'tail';

export type ListNodeCardProps = {
  node: OrderedListNode;
  role: ListNodeRole;
};

function refLabel(id: string | null): string {
  return id === null ? '∅' : id;
}

export function ListNodeCard({ node, role }: ListNodeCardProps) {
  const showBadges = role === 'head' || role === 'tail' || role === 'solo';

  return (
    <View
      testID={`list-node-${node.id}`}
      style={[
        styles.card,
        role === 'head' && styles.cardHead,
        role === 'tail' && styles.cardTail,
        role === 'solo' && styles.cardSolo,
      ]}
    >
      {showBadges ? (
        <View style={styles.badgeRow}>
          {(role === 'head' || role === 'solo') && (
            <View style={styles.badge}>
              <AppText variant="caption" style={styles.badgeText}>
                HEAD
              </AppText>
            </View>
          )}
          {(role === 'tail' || role === 'solo') && (
            <View style={styles.badge}>
              <AppText variant="caption" style={styles.badgeText}>
                TAIL
              </AppText>
            </View>
          )}
        </View>
      ) : null}
      <AppText variant="subtitle" style={styles.value}>
        {node.value}
      </AppText>
      <AppText variant="muted" style={styles.idLine} numberOfLines={1}>
        {node.id}
      </AppText>
      <View style={styles.links}>
        <AppText variant="muted" style={styles.linkLine} numberOfLines={1}>
          prev → {refLabel(node.prev)}
        </AppText>
        <AppText variant="muted" style={styles.linkLine} numberOfLines={1}>
          next → {refLabel(node.next)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 132,
    maxWidth: 168,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
  cardHead: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  cardTail: {
    borderRightWidth: 4,
    borderRightColor: colors.accent,
  },
  cardSolo: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderRightWidth: 4,
    borderRightColor: colors.accent,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: colors.accentMuted,
  },
  badgeText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.6,
  },
  value: {
    marginBottom: 2,
  },
  idLine: {
    fontFamily: 'Menlo',
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  links: {
    gap: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  linkLine: {
    fontFamily: 'Menlo',
    fontSize: 11,
  },
});
