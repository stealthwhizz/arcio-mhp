/**
 * Error Boundary Component
 * Catches and handles React component errors gracefully
 */

import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing } from '../utils/theme';
import { CustomButton } from './ui/CustomButton';
import { GradientBackground } from './ui/GradientBackground';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <GradientBackground>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.title}>Oops! Something went wrong</Text>
              <Text style={styles.message}>
                We encountered an unexpected error. Please try again.
              </Text>
              
              {__DEV__ && this.state.errorMessage && (
                <View style={styles.errorDetails}>
                  <Text style={styles.errorTitle}>Error Details:</Text>
                  <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                </View>
              )}

              <CustomButton
                title="Try Again"
                onPress={this.handleRetry}
                style={styles.retryButton}
              />
            </View>
          </View>
        </GradientBackground>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  errorDetails: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  errorTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.error,
    marginBottom: Spacing.sm,
  },
  errorText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
  retryButton: {
    minWidth: 150,
  },
});
