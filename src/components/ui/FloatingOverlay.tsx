/**
 * Floating Overlay Component
 * A semi-transparent floating overlay with the company logo at 50% opacity
 */

import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useOverlay } from '../../context/OverlayContext';
import { BorderRadius, Colors } from '../../utils/theme';

export const FloatingOverlay: React.FC = () => {
  const { overlayState } = useOverlay();

  /**
   * Handle overlay press (placeholder for interaction)
   */
  const handlePress = () => {
    console.log('Overlay pressed');
  };

  if (!overlayState.isVisible) {
    return null;
  }

  return (
    <View style={[
      styles.overlay,
      {
        left: overlayState.position.x,
        top: overlayState.position.y,
      }
    ]}>
      <TouchableOpacity style={styles.overlayContent} onPress={handlePress}>
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.logoImage} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    zIndex: 1000,
  },
  overlayContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.round,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  logoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
