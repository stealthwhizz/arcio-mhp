/**
 * Main Navigation Configuration
 * Sets up stack and drawer navigation
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { CustomDrawerContent } from '../components/navigation/CustomDrawerContent';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { OverlayProvider } from '../context/OverlayContext';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { MainScreen } from '../screens/MainScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { SignupScreen } from '../screens/SignupScreen';

import { DrawerParamList, RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * Auth Stack - Contains authentication related screens
 */
const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};

/**
 * Main Drawer - Contains authenticated user screens
 */
const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerPosition: 'right',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={MainScreen} />
    </Drawer.Navigator>
  );
};

/**
 * Root Navigator - Switches between auth and main based on authentication state
 */
const RootNavigator: React.FC = () => {
  const { state } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isAuthenticated ? (
        <Stack.Screen name="Main" component={MainDrawer} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

/**
 * App Navigation - Root component with providers
 */
export const AppNavigation: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <OverlayProvider>
          <RootNavigator />
        </OverlayProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};
