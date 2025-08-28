/**
 * Type definitions for the Arcio MHC application
 */

// User authentication types
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Form validation types
export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  usernameOrEmail: string;
  password: string;
}

export interface OTPFormData {
  otp: string;
}

// World/Server types
export interface World {
  id: string;
  name: string;
  version: string;
  username: string;
  currentPlayers: number;
  maxPlayers: number;
  isOnline: boolean;
}

// Overlay types
export interface OverlayState {
  isVisible: boolean;
  position: {
    x: number;
    y: number;
  };
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Signup: undefined;
  Login: undefined;
  OTPVerification: { email: string };
  Main: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  SupportUs: undefined;
  ContactUs: undefined;
  Overlay: undefined;
};
