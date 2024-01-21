import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import App from './App';
import { onAuthStateChanged } from '@react-native-firebase/auth';

// Mock Firebase and Google Sign-In functions
jest.mock('@react-native-firebase/auth', () => ({
    __esModule: true,
    default: auth,
    onAuthStateChanged: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  configure: jest.fn(),
}));

jest.mock('./assets/images/logo.svg', () => 'logo.svg');

jest.mock('@react-native-firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    get: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));

describe('App Component', () => {
  it('renders login screen when not authenticated', async () => {
    // Mock the auth state to simulate not being authenticated
    auth().onAuthStateChanged.mockImplementationOnce((callback) => callback(null));

    const { getByText } = render(<App />);

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      // Assert that the login screen is rendered
      expect(getByText('Login')).toBeTruthy();
    });
  });

  it('renders main app screen when authenticated', async () => {
    // Mock the auth state to simulate being authenticated
    onAuthStateChanged.mockImplementationOnce((callback) => callback({}));

    const { getByText } = render(<App />);

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      // Assert that the main app screen is rendered
      expect(getByText('Board')).toBeTruthy();
    });
  });

  // Add more tests for other components and functionalities as needed
});
