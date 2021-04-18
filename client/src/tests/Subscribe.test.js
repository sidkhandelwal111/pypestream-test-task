import { render, screen } from '@testing-library/react';
import Subscribe from '../components/Subscribe';

test('renders subscribe component', () => {
  render(<Subscribe />);

  const emailInput = screen.getByPlaceholderText("Enter Email...");
  const topicInput = screen.getByPlaceholderText("Enter Topic...");
  const subscribeButton = screen.getAllByText("Subscribe");

  expect(emailInput).toBeInTheDocument();
  expect(topicInput).toBeInTheDocument();
  expect(subscribeButton).toBeInTheDocument();
});
