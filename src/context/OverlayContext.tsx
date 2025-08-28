/**
 * Overlay Context Provider
 * Manages the floating overlay state and position
 */

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { OverlayState } from '../types';

interface OverlayContextType {
  overlayState: OverlayState;
  toggleOverlay: () => void;
  updateOverlayPosition: (x: number, y: number) => void;
  hideOverlay: () => void;
  showOverlay: () => void;
}

// Initial overlay state
const initialOverlayState: OverlayState = {
  isVisible: false,
  position: {
    x: 50, // Default position
    y: 100,
  },
};

// Create context
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Overlay provider component
export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overlayState, setOverlayState] = useState<OverlayState>(initialOverlayState);

  /**
   * Toggle overlay visibility
   */
  const toggleOverlay = () => {
    setOverlayState(prev => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  };

  /**
   * Update overlay position
   */
  const updateOverlayPosition = (x: number, y: number) => {
    setOverlayState(prev => ({
      ...prev,
      position: { x, y },
    }));
  };

  /**
   * Hide overlay
   */
  const hideOverlay = () => {
    setOverlayState(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  /**
   * Show overlay
   */
  const showOverlay = () => {
    setOverlayState(prev => ({
      ...prev,
      isVisible: true,
    }));
  };

  const value: OverlayContextType = {
    overlayState,
    toggleOverlay,
    updateOverlayPosition,
    hideOverlay,
    showOverlay,
  };

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
};

// Custom hook to use overlay context
export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};
