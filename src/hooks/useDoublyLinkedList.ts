import { useCallback, useEffect, useMemo, useReducer } from 'react';

import {
  type DoublyLinkedListAction,
  doublyLinkedListReducer,
  formatEndpoint,
  getOrderedNodes,
  getOrderedValues,
  getSize,
  initialDoublyLinkedListState,
} from '@/domain/doublyLinkedList';
import { ddlLog } from '@/utils/ddlLog';

export function useDoublyLinkedList() {
  const [state, dispatch] = useReducer(doublyLinkedListReducer, initialDoublyLinkedListState);

  const dispatchWithLog = useCallback((action: DoublyLinkedListAction) => {
    ddlLog('hook', 'dispatch', action);
    dispatch(action);
  }, []);

  const actions = useMemo(
    () => ({
      setDraft: (value: string) => dispatchWithLog({ type: 'SET_DRAFT', value }),
      insertHead: () => dispatchWithLog({ type: 'INSERT_HEAD' }),
      insertTail: () => dispatchWithLog({ type: 'INSERT_TAIL' }),
      reset: () => dispatchWithLog({ type: 'RESET' }),
    }),
    [dispatchWithLog],
  );

  const view = useMemo(
    () => ({
      size: getSize(state),
      headLabel: formatEndpoint(state, 'head'),
      tailLabel: formatEndpoint(state, 'tail'),
      orderedValues: getOrderedValues(state),
      orderedNodes: getOrderedNodes(state),
    }),
    [state],
  );

  useEffect(() => {
    ddlLog('hook', 'state commit', {
      draftValue: state.draftValue,
      size: view.size,
      headLabel: view.headLabel,
      tailLabel: view.tailLabel,
      order: view.orderedValues,
      nodeIds: view.orderedNodes.map((n) => n.id),
    });
  }, [state, view]);

  return { state, actions, view };
}
