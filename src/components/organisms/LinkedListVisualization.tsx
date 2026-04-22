import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/atoms/AppText';
import { ListNodeCard, type ListNodeRole } from '@/components/molecules/ListNodeCard';
import type { OrderedListNode } from '@/domain/doublyLinkedList';
import { colors } from '@/theme';
import { spacing } from '@/theme/spacing';

export type LinkedListVisualizationProps = {
  nodes: OrderedListNode[];
  headId: string | null;
  tailId: string | null;
};

function roleFor(node: OrderedListNode, headId: string | null, tailId: string | null): ListNodeRole {
  const isHead = node.id === headId;
  const isTail = node.id === tailId;
  if (isHead && isTail) {
    return 'solo';
  }
  if (isHead) {
    return 'head';
  }
  if (isTail) {
    return 'tail';
  }
  return 'middle';
}

export function LinkedListVisualization({ nodes, headId, tailId }: LinkedListVisualizationProps) {
  if (nodes.length === 0) {
    return (
      <View style={styles.emptyWrap} testID="list-visual-empty">
        <AppText variant="muted" style={styles.emptyTitle}>
          No nodes yet
        </AppText>
        <AppText variant="muted" style={styles.emptyBody}>
          Type a value in the field below, then tap Insert head or Insert tail. Each card shows prev / next
          pointers so you can see the doubly linked structure.
        </AppText>
      </View>
    );
  }

  return (
    <ScrollView
      testID="list-visualization"
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={styles.row}
      nestedScrollEnabled
    >
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {index > 0 ? (
            <View style={styles.arrowWrap} accessibilityElementsHidden>
              <AppText variant="muted" style={styles.arrow}>
                next →
              </AppText>
              <AppText variant="title" style={styles.arrowGlyph}>
                ›
              </AppText>
            </View>
          ) : null}
          <ListNodeCard node={node} role={roleFor(node, headId, tailId)} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingRight: spacing.lg,
  },
  arrowWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    minWidth: 36,
  },
  arrow: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  arrowGlyph: {
    color: colors.accent,
    lineHeight: 28,
  },
  emptyWrap: {
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptyBody: {
    lineHeight: 20,
  },
});
