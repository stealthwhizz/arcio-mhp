/**
 * Theme constants and color scheme for the Arcio MHC application
 */

export const Colors = {
  // Primary gradient colors (dark blue)
  gradientStart: '#1a237e',
  gradientEnd: '#0d47a1',
  
  // Accent colors
  primary: '#f44336', // Red/coral for buttons
  secondary: '#4caf50', // Green for online indicators
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b0bec5',
  textMuted: '#78909c',
  
  // Input field colors
  inputBackground: 'rgba(255, 255, 255, 0.1)',
  inputBorder: 'rgba(255, 255, 255, 0.2)',
  inputFocus: 'rgba(255, 255, 255, 0.3)',
  
  // Background colors
  background: '#1a237e',
  cardBackground: 'rgba(255, 255, 255, 0.05)',
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  
  // Status colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};

export const Gradients = {
  primary: ['#1a237e', '#0d47a1'] as const,
  button: ['#f44336', '#d32f2f'] as const,
  green: ['#4caf50', '#388e3c'] as const,
  darkGray: ['#546e7a', '#37474f'] as const,
  card: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'] as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
