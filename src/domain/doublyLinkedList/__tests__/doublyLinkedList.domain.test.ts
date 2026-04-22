/**
 * Pure domain tests: no React, no RN — only Jest and the list module.
 */
import { doublyLinkedListReducer } from '../reducer';
import { initialDoublyLinkedListState } from '../state';
import { formatEndpoint, getOrderedNodes, getOrderedValues, getSize } from '../selectors';
import { insertHead, insertTail, resetList, setDraft } from '../transitions';
import type { DoublyLinkedListAction, DoublyLinkedListState } from '../types';

function reduceAll(actions: DoublyLinkedListAction[]): DoublyLinkedListState {
  return actions.reduce((state, action) => doublyLinkedListReducer(state, action), initialDoublyLinkedListState);
}

describe('transitions (pure functions)', () => {
  describe('resetList', () => {
    it('returns the canonical empty list', () => {
      const populated = reduceAll([
        { type: 'SET_DRAFT', value: 'a' },
        { type: 'INSERT_HEAD' },
        { type: 'SET_DRAFT', value: 'b' },
        { type: 'INSERT_TAIL' },
      ]);
      expect(getSize(populated)).toBe(2);

      const next = resetList();
      expect(next).toEqual(initialDoublyLinkedListState);
    });
  });

  describe('setDraft', () => {
    it('updates draft text', () => {
      const next = setDraft(initialDoublyLinkedListState, 'hello');
      expect(next.draftValue).toBe('hello');
      expect(next.headId).toBeNull();
    });

    it('returns the same reference when the draft is unchanged', () => {
      const s = setDraft(initialDoublyLinkedListState, 'x');
      expect(setDraft(s, 'x')).toBe(s);
    });
  });

  describe('insertHead', () => {
    it('no-ops when draft is empty or only whitespace', () => {
      const empty = insertHead(initialDoublyLinkedListState);
      expect(empty).toBe(initialDoublyLinkedListState);

      const blank = insertHead(setDraft(initialDoublyLinkedListState, '   \n'));
      expect(getSize(blank)).toBe(0);
      expect(blank.draftValue).toBe('   \n');
    });

    it('creates head and tail for the first node and clears the draft', () => {
      const s0 = setDraft(initialDoublyLinkedListState, 'first');
      const s1 = insertHead(s0);
      expect(s1.draftValue).toBe('');
      expect(s1.headId).toBe(s1.tailId);
      expect(s1.headId).toBeTruthy();
      const id = s1.headId as string;
      expect(s1.nodes[id]).toEqual({
        id,
        value: 'first',
        prev: null,
        next: null,
      });
    });

    it('prepends a new head and wires prev/next', () => {
      let s = setDraft(initialDoublyLinkedListState, 'old');
      s = insertHead(s);
      s = setDraft(s, 'new');
      s = insertHead(s);

      expect(getOrderedValues(s)).toEqual(['new', 'old']);
      const head = s.headId as string;
      const tail = s.tailId as string;
      expect(s.nodes[head].next).toBe(tail);
      expect(s.nodes[tail].prev).toBe(head);
      expect(s.nodes[head].prev).toBeNull();
      expect(s.nodes[tail].next).toBeNull();
    });
  });

  describe('insertTail', () => {
    it('no-ops when draft is empty', () => {
      expect(insertTail(initialDoublyLinkedListState)).toBe(initialDoublyLinkedListState);
    });

    it('appends at the tail and preserves prior head', () => {
      let s = setDraft(initialDoublyLinkedListState, 'a');
      s = insertHead(s);
      s = setDraft(s, 'b');
      s = insertTail(s);

      expect(getOrderedValues(s)).toEqual(['a', 'b']);
      expect(s.headId).not.toBe(s.tailId);
    });
  });
});

describe('doublyLinkedListReducer', () => {
  it('chains SET_DRAFT, INSERT_HEAD, INSERT_TAIL', () => {
    const s = reduceAll([
      { type: 'SET_DRAFT', value: 'x' },
      { type: 'INSERT_HEAD' },
      { type: 'SET_DRAFT', value: 'y' },
      { type: 'INSERT_TAIL' },
    ]);
    expect(getOrderedValues(s)).toEqual(['x', 'y']);
    expect(getSize(s)).toBe(2);
  });

  it('RESET discards nodes regardless of prior size', () => {
    const s = reduceAll([
      { type: 'SET_DRAFT', value: 'only' },
      { type: 'INSERT_HEAD' },
      { type: 'RESET' },
    ]);
    expect(s).toEqual(initialDoublyLinkedListState);
  });
});

describe('selectors', () => {
  it('getSize walks from head to tail', () => {
    const s = reduceAll([
      { type: 'SET_DRAFT', value: '1' },
      { type: 'INSERT_HEAD' },
      { type: 'SET_DRAFT', value: '2' },
      { type: 'INSERT_HEAD' },
      { type: 'SET_DRAFT', value: '3' },
      { type: 'INSERT_TAIL' },
    ]);
    expect(getSize(s)).toBe(3);
    expect(getOrderedValues(s)).toEqual(['2', '1', '3']);
  });

  it('getOrderedValues returns an empty array when the list is empty', () => {
    expect(getOrderedValues(initialDoublyLinkedListState)).toEqual([]);
  });

  it('getOrderedNodes walks head→tail with prev/next ids', () => {
    const s = reduceAll([
      { type: 'SET_DRAFT', value: 'a' },
      { type: 'INSERT_HEAD' },
      { type: 'SET_DRAFT', value: 'b' },
      { type: 'INSERT_TAIL' },
    ]);
    const nodes = getOrderedNodes(s);
    expect(nodes).toHaveLength(2);
    expect(nodes[0].value).toBe('a');
    expect(nodes[0].prev).toBeNull();
    expect(nodes[0].next).toBe(nodes[1].id);
    expect(nodes[1].prev).toBe(nodes[0].id);
    expect(nodes[1].next).toBeNull();
  });

  it('getOrderedValues stops if the chain is broken (missing node)', () => {
    const broken: DoublyLinkedListState = {
      ...initialDoublyLinkedListState,
      headId: 'missing',
      tailId: 'missing',
      nodes: {},
    };
    expect(getOrderedValues(broken)).toEqual([]);
    expect(getSize(broken)).toBe(1);
  });

  it('formatEndpoint uses em dash when empty or node missing', () => {
    expect(formatEndpoint(initialDoublyLinkedListState, 'head')).toBe('—');
    expect(formatEndpoint(initialDoublyLinkedListState, 'tail')).toBe('—');

    const ghost: DoublyLinkedListState = {
      ...initialDoublyLinkedListState,
      headId: 'ghost',
      nodes: {},
    };
    expect(formatEndpoint(ghost, 'head')).toBe('—');
  });

  it('formatEndpoint includes value and id', () => {
    const s = reduceAll([
      { type: 'SET_DRAFT', value: 'edge' },
      { type: 'INSERT_TAIL' },
    ]);
    const id = s.tailId as string;
    expect(formatEndpoint(s, 'tail')).toBe(`edge (${id})`);
    expect(formatEndpoint(s, 'head')).toBe(`edge (${id})`);
  });
});
