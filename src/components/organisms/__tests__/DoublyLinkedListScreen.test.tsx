/**
 * Screen-level tests: user-visible flows via React Native Testing Library.
 * Assertions target business outcomes (stats, order), not layout details.
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DoublyLinkedListScreen } from '../DoublyLinkedListScreen';

function renderScreen() {
  return render(
    <SafeAreaProvider>
      <DoublyLinkedListScreen />
    </SafeAreaProvider>,
  );
}

describe('DoublyLinkedListScreen', () => {
  it('starts empty: size 0, placeholder copy, dash endpoints', () => {
    renderScreen();

    expect(screen.getByTestId('stat-size')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-head')).toHaveTextContent('—');
    expect(screen.getByTestId('stat-tail')).toHaveTextContent('—');
    expect(screen.getByTestId('list-order-empty')).toBeTruthy();
    expect(screen.getByTestId('list-visual-empty')).toBeTruthy();
  });

  it('insert head: draft becomes node at head; size and order update', () => {
    renderScreen();

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'alpha');
    fireEvent.press(screen.getByRole('button', { name: 'Insert head' }));

    expect(screen.getByTestId('stat-size')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-head')).toHaveTextContent(/alpha/);
    expect(screen.getByTestId('stat-tail')).toHaveTextContent(/alpha/);
    expect(screen.getByTestId('list-order')).toHaveTextContent('alpha');
    expect(screen.queryByTestId('list-order-empty')).toBeNull();
    expect(screen.getByTestId('list-node-n-1')).toHaveTextContent(/alpha/);
  });

  it('insert tail appends after prior inserts (head then tail)', () => {
    renderScreen();

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'first');
    fireEvent.press(screen.getByRole('button', { name: 'Insert head' }));

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'second');
    fireEvent.press(screen.getByRole('button', { name: 'Insert tail' }));

    expect(screen.getByTestId('stat-size')).toHaveTextContent('2');
    expect(screen.getByTestId('list-order')).toHaveTextContent(/first.*→.*second/);
  });

  it('insert head prepends relative to existing list', () => {
    renderScreen();

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'old');
    fireEvent.press(screen.getByRole('button', { name: 'Insert head' }));

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'new');
    fireEvent.press(screen.getByRole('button', { name: 'Insert head' }));

    expect(screen.getByTestId('list-order')).toHaveTextContent(/new.*→.*old/);
  });

  it('reset clears list back to empty state', () => {
    renderScreen();

    fireEvent.changeText(screen.getByTestId('node-value-input'), 'x');
    fireEvent.press(screen.getByRole('button', { name: 'Insert head' }));
    expect(screen.getByTestId('stat-size')).toHaveTextContent('1');

    fireEvent.press(screen.getByRole('button', { name: 'Reset list' }));

    expect(screen.getByTestId('stat-size')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-head')).toHaveTextContent('—');
    expect(screen.getByTestId('list-order-empty')).toBeTruthy();
    expect(screen.getByTestId('list-visual-empty')).toBeTruthy();
  });

  it('does not grow the list when insert is pressed with an empty draft', () => {
    renderScreen();

    const insertHead = screen.getByRole('button', { name: 'Insert head' });
    const insertTail = screen.getByRole('button', { name: 'Insert tail' });
    expect(insertHead).toBeDisabled();
    expect(insertTail).toBeDisabled();

    fireEvent.press(insertHead);
    fireEvent.press(insertTail);

    expect(screen.getByTestId('stat-size')).toHaveTextContent('0');
  });
});
