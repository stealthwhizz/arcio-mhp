/**
 * Signup Screen
 * User registration form with validation
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
import { RootStackParamList, SignupFormData } from '../types';
import { Colors, FontSizes, FontWeights, Spacing } from '../utils/theme';
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from '../utils/validation';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup, state } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  /**
   * Update form field value
   */
  const updateField = (field: keyof SignupFormData, value: string) => {
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
    const newErrors: Partial<SignupFormData> = {};

    // Validate username
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Validate confirm password
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const success = await signup(formData);
      if (success) {
        // Navigate to OTP verification
        navigation.navigate('OTPVerification', { email: formData.email });
      } else {
        Alert.alert('Signup Failed', 'Please try again later.');
      }
    } catch {
      Alert.alert('Error', 'An error occurred during signup.');
    }
  };

  /**
   * Navigate to login screen
   */
  const navigateToLogin = () => {
    navigation.navigate('Login');
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
                Create an Arcio account to continue using the app.
              </Text>

              <View style={styles.form}>
                <Text style={styles.fieldLabel}>Arcio Username</Text>
                <CustomInput
                  placeholder="Enter your username..."
                  value={formData.username}
                  onChangeText={(value) => updateField('username', value)}
                  error={errors.username}
                  autoCapitalize="none"
                />

                <Text style={styles.fieldLabel}>Email Address</Text>
                <CustomInput
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  keyboardType="email-address"
                  error={errors.email}
                  autoCapitalize="none"
                />

                <Text style={styles.fieldLabel}>Password</Text>
                <CustomInput
                  placeholder="Create a password..."
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  secureTextEntry
                  showPasswordToggle
                  error={errors.password}
                />

                <Text style={styles.fieldLabel}>Confirm Password</Text>
                <CustomInput
                  placeholder="Confirm your password..."
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  secureTextEntry
                  showPasswordToggle
                  error={errors.confirmPassword}
                />

                <CustomButton
                  title="Continue"
                  onPress={handleSignup}
                  loading={state.isLoading}
                  style={styles.signupButton}
                />
              </View>

              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.loginLink}>
                  Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
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
  signupButton: {
    marginTop: Spacing.lg,
  },
  loginLink: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loginLinkBold: {
    color: Colors.primary,
    fontWeight: FontWeights.semibold,
  },
});
