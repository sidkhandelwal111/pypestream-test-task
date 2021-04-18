import { render, screen } from '@testing-library/react';
import Publish from '../components/Publish';

test('renders publish component', () => {
  render(<Publish />);

  const topicInput = screen.getByPlaceholderText("Enter Topic...");
  const messageInput = screen.getByPlaceholderText("Enter Text/HTML Message...");
  const broadcastList = screen.getByTestId("broadcastList");

  expect(topicInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
  expect(broadcastList).toBeInTheDocument();
});
