import type { DoublyLinkedListState, ListNode, NodeId } from './types';

/** Node in head→tail order for UI visualization. */
export type OrderedListNode = {
  id: NodeId;
  value: string;
  prev: NodeId | null;
  next: NodeId | null;
};

export function getSize(state: DoublyLinkedListState): number {
  if (state.headId === null) {
    return 0;
  }
  let count = 0;
  let cursor: string | null = state.headId;
  while (cursor !== null) {
    count += 1;
    cursor = state.nodes[cursor]?.next ?? null;
  }
  return count;
}

export function getOrderedNodes(state: DoublyLinkedListState): OrderedListNode[] {
  if (state.headId === null) {
    return [];
  }
  const out: OrderedListNode[] = [];
  let cursor: string | null = state.headId;
  while (cursor !== null) {
    const node: ListNode | undefined = state.nodes[cursor];
    if (!node) {
      break;
    }
    out.push({
      id: node.id,
      value: node.value,
      prev: node.prev,
      next: node.next,
    });
    cursor = node.next;
  }
  return out;
}

export function getOrderedValues(state: DoublyLinkedListState): string[] {
  if (state.headId === null) {
    return [];
  }
  const values: string[] = [];
  let cursor: string | null = state.headId;
  while (cursor !== null) {
    const node: ListNode | undefined = state.nodes[cursor];
    if (!node) {
      break;
    }
    values.push(node.value);
    cursor = node.next;
  }
  return values;
}

export function formatEndpoint(state: DoublyLinkedListState, kind: 'head' | 'tail'): string {
  const id = kind === 'head' ? state.headId : state.tailId;
  if (id === null) {
    return '—';
  }
  const node = state.nodes[id];
  if (!node) {
    return '—';
  }
  return `${node.value} (${node.id})`;
}
