import type { DoublyLinkedListState } from './types';

export const initialDoublyLinkedListState: DoublyLinkedListState = {
  nodes: {},
  headId: null,
  tailId: null,
  idCounter: 0,
  draftValue: '',
};
