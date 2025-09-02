/**
 * Main Screen (Dashboard)
 * Home screen with world hosting features and world list
 */

import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { FloatingOverlay } from '../components/ui/FloatingOverlay';
import { GradientBackground } from '../components/ui/GradientBackground';
import { WorldCard } from '../components/ui/WorldCard';
import { DrawerParamList, World } from '../types';
import { BorderRadius, Colors, FontSizes, FontWeights, Gradients, Spacing } from '../utils/theme';

type MainScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

interface Props {
  navigation: MainScreenNavigationProp;
}

// Mock worlds data
const mockWorlds: World[] = [
  {
    id: '1',
    name: 'My World - v1.20.81.2',
    version: '1.20.81.2',
    username: 'liteamaze',
    currentPlayers: 4,
    maxPlayers: 5,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Adventure World',
    version: '1.20.80.1',
    username: 'gamemaster',
    currentPlayers: 2,
    maxPlayers: 8,
    isOnline: true,
  },
  {
    id: '3',
    name: 'Creative Build',
    version: '1.20.79.5',
    username: 'builder123',
    currentPlayers: 0,
    maxPlayers: 10,
    isOnline: false,
  },
];

export const MainScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorlds, setFilteredWorlds] = useState<World[]>(mockWorlds);

  /**
   * Filter worlds based on search query
   */
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredWorlds(mockWorlds);
    } else {
      const filtered = mockWorlds.filter(world =>
        world.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        world.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWorlds(filtered);
    }
  }, [searchQuery]);

  /**
   * Open drawer menu
   */
  const openDrawer = () => {
    navigation.openDrawer();
  };

  /**
   * Handle host world button press
   */
  const handleHostWorld = () => {
    // Placeholder for host world functionality
    console.log('Host World pressed');
  };

  /**
   * Handle versions filter
   */
  const handleVersionsFilter = () => {
    // Placeholder for versions filter functionality
    console.log('Versions filter pressed');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Host World Button */}
          <TouchableOpacity
            onPress={handleHostWorld}
            activeOpacity={0.8}
            style={styles.hostButton}
          >
            <LinearGradient
              colors={Gradients.green}
              style={styles.hostButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.hostButtonText}>HOST WORLD</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search worlds..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <TouchableOpacity
              onPress={handleVersionsFilter}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={Gradients.darkGray}
                style={styles.filterButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.filterButtonText}>Versions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Worlds List */}
          <View style={styles.worldsSection}>
            <Text style={styles.sectionTitle}>Available Worlds</Text>
            {filteredWorlds.length > 0 ? (
              filteredWorlds.map((world) => (
                <WorldCard key={world.id} world={world} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No worlds found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your search or create a new world
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Floating Overlay */}
        <FloatingOverlay />
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  headerLogo: {
    width: 120,
    height: 40,
    flex: 1,
  },
  menuButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  hostButton: {
    marginBottom: Spacing.xl,
  },
  hostButtonGradient: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  hostButtonText: {
    color: Colors.textPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.lg,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.lg,
  },
  filterButton: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    minHeight: 36,
  },
  filterButtonText: {
    color: Colors.textPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  worldsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyStateText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
