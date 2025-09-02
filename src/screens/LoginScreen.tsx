/**
 * Login Screen
 * User authentication form
 */

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton } from '../components/ui/CustomButton';
import { CustomInput } from '../components/ui/CustomInput';
import { GradientBackground } from '../components/ui/GradientBackground';
import { useAuth } from '../context/AuthContext';
import { LoginFormData, RootStackParamList } from '../types';
import { Colors, FontSizes, FontWeights, Spacing } from '../utils/theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, state } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  /**
   * Update form field value
   */
  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const success = await login(formData);
      if (success) {
        // Navigation to main screen is handled by the navigation stack
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  /**
   * Navigate to signup screen
   */
  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.formCard}>
              <Image
                source={require('../../assets/images/main.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subtitle}>
                Provide the information to log into your Arcio account.
              </Text>

              <View style={styles.form}>
                <Text style={styles.fieldLabel}>Username or Email</Text>
                <CustomInput
                  placeholder="Enter your username or email..."
                  value={formData.usernameOrEmail}
                  onChangeText={(value) => updateField('usernameOrEmail', value)}
                  error={errors.usernameOrEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Text style={styles.fieldLabel}>Password</Text>
                <CustomInput
                  placeholder="Enter your password..."
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  secureTextEntry
                  showPasswordToggle
                  error={errors.password}
                />

                <CustomButton
                  title="Continue"
                  onPress={handleLogin}
                  loading={state.isLoading}
                  style={styles.loginButton}
                />
              </View>

              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={styles.signupLink}>
                  Don&apos;t have an Account? <Text style={styles.signupLinkBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: Spacing.xl,
    marginHorizontal: Spacing.md,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  fieldLabel: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  loginButton: {
    marginTop: Spacing.lg,
  },
  signupLink: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  signupLinkBold: {
    color: Colors.primary,
    fontWeight: FontWeights.semibold,
  },
});
