# Instructions

- Create a branch called `technical-challenge` for your work
- Update readme with instructions on how to run/test your code

# Challenge

## Doubly Linked List - React Version

We want you to implement a Doubly Linked List (DDL) in React. You will need to build the DDL data structure from scratch and create a visual, interactive representation of it.

### What is a Doubly Linked List?

A Doubly Linked List (DDL) is a linear data structure where each node contains data and two pointers: one to the previous node (`prev`) and one to the next node (`next`). Unlike a singly linked list, you can traverse in both directions. The list has a `head` (first node) and a `tail` (last node), where the head's `prev` is `null` and the tail's `next` is `null`.

### Requirements:

Build the DDL from scratch (no libraries or built-in data structures) and expose all operations through an interactive UI. Your code should be as performant as possible.

- Insert head / Insert tail: Add nodes at the beginning or end of the list.
- Remove an element: By index or value (your choice).
- Remove all duplicates: Keep only one occurrence of each value.
- Search: Return the element's index if found.
- Size: Display the current count of nodes.
- Visualize the list: Render nodes and their prev/next connections so the structure is visible.
- Display state: Show the current head, tail, and size at all times.

## Technical Requirements

- React 18+ with TypeScript
- Use React hooks for state management
- Visualize the list using divs, SVG, or whatever works — it doesn't need to be fancy, just clear
- Feel free to use any styling library (recommended for saving time)

## React Native Variant

If this challenge is assigned for a React Native role, implement the solution using React Native components (View, Text, TouchableOpacity, FlatList/ScrollView, TextInput, etc.) instead of HTML elements. The DDL logic, state management, and interactivity expectations remain identical. Your solution should run on a mobile simulator or Expo.

# Additional details

- You have 1 hour for this
- Make sure the DDL operations work correctlym, that's the most important part.
- Add comments if you want to explain your approach
- Once complete, please create a PR, assign yourself as the owner, and add the designated individual as the reviewer.

Good luck!

---

## Run and test (Expo / React Native)

This repo includes an **Expo (SDK 54)** app using **Expo Router**, **TypeScript**, and a **domain + hook** split: list transitions live under [`src/domain/doublyLinkedList/`](src/domain/doublyLinkedList/), and [`src/hooks/useDoublyLinkedList.ts`](src/hooks/useDoublyLinkedList.ts) exposes `useReducer`-only state (no `useState` for list UI). UI follows **atomic design** (atoms → molecules → organisms; no separate `templates` layer).

### Prerequisites

- Node.js 20+ recommended
- For iOS simulator: Xcode (macOS). For Android: Android Studio / emulator.

### Install

```sh
npm install
```

### Start

```sh
npm run start
```

Then press `i` for iOS, `a` for Android, or `w` for web from the Expo CLI, or run:

```sh
npm run ios
npm run android
npm run web
```

### Project layout (high level)

- [`app/`](app/) — Expo Router routes
- [`src/components/atoms`](src/components/atoms) — smallest building blocks
- [`src/components/molecules`](src/components/molecules) — small compositions
- [`src/components/organisms`](src/components/organisms) — screen sections / shells
- [`src/domain/doublyLinkedList`](src/domain/doublyLinkedList) — pure list state + transitions
- [`src/hooks`](src/hooks) — React hooks wrapping reducers
