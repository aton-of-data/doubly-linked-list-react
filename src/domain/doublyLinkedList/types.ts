export type NodeId = string;

export type ListNode = {
  id: NodeId;
  value: string;
  prev: NodeId | null;
  next: NodeId | null;
};

export type DoublyLinkedListState = {
  nodes: Record<NodeId, ListNode>;
  headId: NodeId | null;
  tailId: NodeId | null;
  idCounter: number;
  draftValue: string;
};

export type DoublyLinkedListAction =
  | { type: 'RESET' }
  | { type: 'SET_DRAFT'; value: string }
  | { type: 'INSERT_HEAD' }
  | { type: 'INSERT_TAIL' };
