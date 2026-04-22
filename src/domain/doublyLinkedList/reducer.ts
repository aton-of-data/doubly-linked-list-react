import type { DoublyLinkedListAction, DoublyLinkedListState } from './types';
import { insertHead, insertTail, resetList, setDraft } from './transitions';
import { ddlLog } from '@/utils/ddlLog';

function snapshot(s: DoublyLinkedListState) {
  return {
    draftValue: s.draftValue,
    headId: s.headId,
    tailId: s.tailId,
    nodeCount: Object.keys(s.nodes).length,
    idCounter: s.idCounter,
  };
}

export function doublyLinkedListReducer(
  state: DoublyLinkedListState,
  action: DoublyLinkedListAction,
): DoublyLinkedListState {
  ddlLog('reducer', `← ${action.type}`, { action, before: snapshot(state) });

  let next: DoublyLinkedListState;
  switch (action.type) {
    case 'RESET':
      next = resetList();
      break;
    case 'SET_DRAFT':
      next = setDraft(state, action.value);
      break;
    case 'INSERT_HEAD':
      next = insertHead(state);
      break;
    case 'INSERT_TAIL':
      next = insertTail(state);
      break;
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }

  ddlLog('reducer', `→ ${action.type}`, { after: snapshot(next), unchanged: next === state });
  return next;
}
