/**
 * World Card Component
 * Displays world information with username, name, player count, and online status
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { World } from '../../types';
import { BorderRadius, Colors, FontSizes, FontWeights, Gradients, Spacing } from '../../utils/theme';

interface WorldCardProps {
  world: World;
}

export const WorldCard: React.FC<WorldCardProps> = ({ world }) => {
  return (
    <LinearGradient
      colors={Gradients.card}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{world.username}</Text>
          {world.username === 'liteamaze' && (
            <View style={styles.userStatusDot} />
          )}
        </View>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            { backgroundColor: world.isOnline ? Colors.secondary : Colors.textMuted }
          ]} />
          <Text style={styles.statusText}>
            {world.isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.worldName}>{world.name}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.version}>v{world.version}</Text>
        <Text style={styles.playerCount}>
          {world.currentPlayers}/{world.maxPlayers} players
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  username: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeights.medium,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginLeft: Spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  worldName: {
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  version: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  playerCount: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeights.medium,
  },
});
