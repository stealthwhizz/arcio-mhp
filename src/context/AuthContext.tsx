/**
 * Authentication Context Provider
 * Manages user authentication state and related operations
 */

import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { AuthState, LoginFormData, SignupFormData, User } from '../types';

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginFormData) => Promise<boolean>;
  signup: (userData: SignupFormData) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
}

// Auth reducer actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Simulate login API call
   * In a real app, this would make an API request
   */
  const login = async (credentials: LoginFormData): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        username: credentials.usernameOrEmail,
        email: credentials.usernameOrEmail.includes('@') 
          ? credentials.usernameOrEmail 
          : `${credentials.usernameOrEmail}@example.com`,
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
      return true;
    } catch {
      dispatch({ type: 'AUTH_FAILURE' });
      return false;
    }
  };

  /**
   * Simulate signup API call
   * In a real app, this would make an API request
   */
  const signup = async (userData: SignupFormData): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup (user needs to verify email)
      dispatch({ type: 'AUTH_FAILURE' }); // Keep unauthenticated until OTP verification
      return true;
    } catch {
      dispatch({ type: 'AUTH_FAILURE' });
      return false;
    }
  };

  /**
   * Simulate OTP verification
   * In a real app, this would verify the OTP with the backend
   */
  const verifyOTP = async (otp: string): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful OTP verification
      if (otp === '123456') {
        const mockUser: User = {
          id: '1',
          username: 'newuser',
          email: 'newuser@example.com',
        };
        
        dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
        return true;
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
        return false;
      }
    } catch {
      dispatch({ type: 'AUTH_FAILURE' });
      return false;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
