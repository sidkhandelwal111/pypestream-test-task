import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app component', () => {
  render(<App />);
  const subscribeLink = screen.getByText("Subscribe To A Topic");
  const publishLink = screen.getByText("Publish Message");
  expect(subscribeLink).toBeInTheDocument();
  expect(publishLink).toBeInTheDocument();
});
