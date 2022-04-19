import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<App/>)
  const listItems = screen.getAllByRole('listitem')
  expect(listItems.length).toBe(3)
})

test("render h1", () => {
  render(<App/>)
  const head = screen.getByTestId('head')
  expect(head).toBeInTheDocument()
})

test("result of sum should be 12", () => {
  render(<App/>)
  const sum = screen.getByTitle("sum")
  expect(sum.textContent).toBe('12')
})