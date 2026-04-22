import { initialDoublyLinkedListState } from './state';
import type { DoublyLinkedListState, ListNode, NodeId } from './types';
import { ddlLog } from '@/utils/ddlLog';

function nextId(state: DoublyLinkedListState): { id: NodeId; idCounter: number } {
  const idCounter = state.idCounter + 1;
  return { id: `n-${idCounter}`, idCounter };
}

export function resetList(): DoublyLinkedListState {
  return initialDoublyLinkedListState;
}

export function setDraft(state: DoublyLinkedListState, value: string): DoublyLinkedListState {
  if (value === state.draftValue) {
    return state;
  }
  return { ...state, draftValue: value };
}

export function insertHead(state: DoublyLinkedListState): DoublyLinkedListState {
  const value = state.draftValue.trim();
  if (!value) {
    ddlLog('transition', 'insertHead skipped (empty draft after trim)', {
      rawDraft: state.draftValue,
    });
    return state;
  }

  const { id: newId, idCounter } = nextId(state);

  if (state.headId === null || state.tailId === null) {
    const node: ListNode = { id: newId, value, prev: null, next: null };
    return {
      ...state,
      idCounter,
      draftValue: '',
      headId: newId,
      tailId: newId,
      nodes: { ...state.nodes, [newId]: node },
    };
  }

  const oldHeadId = state.headId;
  const oldHead = state.nodes[oldHeadId];
  const newNode: ListNode = { id: newId, value, prev: null, next: oldHeadId };
  const updatedOldHead: ListNode = { ...oldHead, prev: newId };

  return {
    ...state,
    idCounter,
    draftValue: '',
    headId: newId,
    nodes: {
      ...state.nodes,
      [newId]: newNode,
      [oldHeadId]: updatedOldHead,
    },
  };
}

export function insertTail(state: DoublyLinkedListState): DoublyLinkedListState {
  const value = state.draftValue.trim();
  if (!value) {
    ddlLog('transition', 'insertTail skipped (empty draft after trim)', {
      rawDraft: state.draftValue,
    });
    return state;
  }

  const { id: newId, idCounter } = nextId(state);

  if (state.headId === null || state.tailId === null) {
    const node: ListNode = { id: newId, value, prev: null, next: null };
    return {
      ...state,
      idCounter,
      draftValue: '',
      headId: newId,
      tailId: newId,
      nodes: { ...state.nodes, [newId]: node },
    };
  }

  const oldTailId = state.tailId;
  const oldTail = state.nodes[oldTailId];
  const newNode: ListNode = { id: newId, value, prev: oldTailId, next: null };
  const updatedOldTail: ListNode = { ...oldTail, next: newId };

  return {
    ...state,
    idCounter,
    draftValue: '',
    tailId: newId,
    nodes: {
      ...state.nodes,
      [newId]: newNode,
      [oldTailId]: updatedOldTail,
    },
  };
}
