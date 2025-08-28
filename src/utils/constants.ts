/**
 * Application Constants
 * Centralized configuration and constants
 */

export const APP_CONFIG = {
  // App Information
  APP_NAME: 'Arcio MHC',
  VERSION: '1.0.0',
  
  // Development Settings
  DEV_MODE: __DEV__,
  
  // Mock Credentials (for development)
  MOCK_OTP: '123456',
  
  // Animation Durations
  ANIMATION_DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
  
  // API Endpoints (placeholder)
  API_ENDPOINTS: {
    BASE_URL: 'https://api.arcio-mhc.com',
    AUTH: '/auth',
    WORLDS: '/worlds',
    USERS: '/users',
  },
  
  // Feature Flags
  FEATURES: {
    OVERLAY_ENABLED: true,
    DRAWER_ENABLED: true,
    ANALYTICS_ENABLED: false,
  },
  
  // UI Configuration
  UI_CONFIG: {
    MAX_WORLD_NAME_LENGTH: 50,
    MAX_USERNAME_LENGTH: 20,
    MIN_PASSWORD_LENGTH: 8,
    OTP_LENGTH: 6,
    OVERLAY_SIZE: 60,
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Please check your internet connection',
    AUTH_FAILED: 'Invalid credentials. Please try again.',
    OTP_INVALID: 'Invalid OTP code. Please try again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    SIGNUP_SUCCESS: 'Account created successfully!',
    LOGIN_SUCCESS: 'Welcome back!',
    OTP_SENT: 'OTP has been sent to your email',
    LOGOUT_SUCCESS: 'You have been logged out',
  },
};

// Export individual constants for convenience
export const { APP_NAME, VERSION } = APP_CONFIG;
export const { FEATURES } = APP_CONFIG;
export const { UI_CONFIG } = APP_CONFIG;
export const { ERROR_MESSAGES, SUCCESS_MESSAGES } = APP_CONFIG;
