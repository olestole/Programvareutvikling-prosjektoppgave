import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Index from '../pages/index';
import Login from '../pages/login';
import RoomList from '../pages/rooms/index';
import RoomDetail from '../pages/rooms/[id]';
import UserBookings from '../pages/user/index';
import UserProvider from '../components/shared/UserProvider';
import Booking from '../pages/booking';

// Mocks useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
function mockNextUseRouter(props) {
  useRouter.mockImplementation(() => ({
    query: {
      route: props.route,
      pathname: props.pathname,
      query: props.query,
      asPath: props.asPath
    }
  }));
}

test('index page renders correctly', () => {
  mockNextUseRouter({
    query: {
      from_date: '2020-10-10',
      to_date: '2020-10-13',
      people: 3
    }
  });
  const { container } = render(
    <UserProvider>
      <Index />
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});

test('login page renders correctly', () => {
  const { container } = render(
    <UserProvider>
      <Login />
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Room list renders correctly', async () => {
  const { container } = render(
    <UserProvider>
      <RoomList />
    </UserProvider>
  );
  await waitFor(() => expect(container).toMatchSnapshot());
});

test('Room detail renders correctly', () => {
  const { container } = render(
    <UserProvider>
      <RoomDetail
        room={{
          id: 1,
          title: 'test',
          description: 'test',
          amenities: ['test', 'test2'],
          unavailable_dates: [{ from: '2020-10-10', to: '2020-10-15' }]
        }}
      />
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});

test('User bookings renders correctly', () => {
  const { container } = render(
    <UserProvider>
      <UserBookings />
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Booking page renders correctly', () => {
  const { container } = render(
    <UserProvider>
      <Booking />
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});
