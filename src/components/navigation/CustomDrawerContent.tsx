/**
 * Custom Drawer Content Component
 * Dark-themed sidebar navigation with menu items
 */

import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useOverlay } from '../../context/OverlayContext';
import { Colors, FontSizes, FontWeights, Spacing } from '../../utils/theme';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout, state } = useAuth();
  const { toggleOverlay } = useOverlay();

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    props.navigation.closeDrawer();
  };

  /**
   * Handle overlay toggle
   */
  const handleOverlayToggle = () => {
    toggleOverlay();
    props.navigation.closeDrawer();
  };

  /**
   * Handle support us
   */
  const handleSupportUs = () => {
    console.log('Support Us pressed');
    props.navigation.closeDrawer();
  };

  /**
   * Handle contact us
   */
  const handleContactUs = () => {
    console.log('Contact Us pressed');
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <DrawerContentScrollView {...props} style={styles.scrollView}>
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../../assets/images/main.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.userInfo}>
              <View style={styles.userHeader}>
                <Text style={styles.username}>{state.user?.username || 'Guest'}</Text>
                <View style={styles.statusIndicator} />
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem} onPress={handleSupportUs}>
              <Ionicons name="heart" size={20} color={Colors.textSecondary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Support Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleContactUs}>
              <Ionicons name="call" size={20} color={Colors.textSecondary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleOverlayToggle}>
              <Ionicons name="add-circle" size={20} color={Colors.textSecondary} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Overlay</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
            <Ionicons
              name="log-out-outline"
              size={20}
              color={Colors.primary}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
    marginBottom: Spacing.md,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 36,
  },
  userInfo: {
    marginTop: Spacing.sm,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  username: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff00',
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  menuSection: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xs,
  },
  menuIcon: {
    marginRight: Spacing.sm,
  },
  menuLabel: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.inputBorder,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  logoutIcon: {
    marginLeft: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.semibold,
  },
});
