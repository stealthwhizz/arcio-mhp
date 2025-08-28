/**
 * OTP Verification Screen
 * Email verification with 6-digit OTP code
 */

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CustomButton } from '../components/ui/CustomButton';
import { CustomInput } from '../components/ui/CustomInput';
import { GradientBackground } from '../components/ui/GradientBackground';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types';
import { Colors, FontSizes, FontWeights, Spacing } from '../utils/theme';
import { validateOTP } from '../utils/validation';

type OTPVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPVerificationScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

interface Props {
  navigation: OTPVerificationScreenNavigationProp;
  route: OTPVerificationScreenRouteProp;
}

export const OTPVerificationScreen: React.FC<Props> = ({ navigation }) => {
  const { verifyOTP, state } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  /**
   * Handle OTP input change
   */
  const handleOTPChange = (value: string) => {
    // Only allow numeric input and limit to 6 characters
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(numericValue);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  /**
   * Validate OTP format
   */
  const validateForm = (): boolean => {
    if (!validateOTP(otp)) {
      setError('Please enter a valid 6-digit OTP code');
      return false;
    }
    return true;
  };

  /**
   * Handle OTP verification
   */
  const handleVerifyOTP = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const success = await verifyOTP(otp);
      if (success) {
        // Navigation to main screen is handled by the auth state change
        navigation.navigate('Main');
      } else {
        Alert.alert('Verification Failed', 'Invalid OTP code. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'An error occurred during verification.');
    }
  };

  /**
   * Go back to signup screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.formCard}>
            <Text style={styles.title}>EMAIL VERIFICATION</Text>
            
            <Text style={styles.message}>
              An OTP has been sent to your email address, please enter the code.
            </Text>

            <View style={styles.form}>
              <CustomInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={handleOTPChange}
                keyboardType="numeric"
                error={error}
                style={styles.otpInput}
              />

              <CustomButton
                title="Continue"
                onPress={handleVerifyOTP}
                loading={state.isLoading}
                disabled={otp.length !== 6}
                style={styles.continueButton}
              />

              <TouchableOpacity onPress={goBack}>
                <Text style={styles.backLink}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: Spacing.xl,
    marginHorizontal: Spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 1,
  },
  message: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  form: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  otpInput: {
    marginBottom: Spacing.lg,
  },
  continueButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  backLink: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: FontWeights.semibold,
  },
});
