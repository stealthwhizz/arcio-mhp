# Arcio MHC Mobile App

A production-ready React Native mobile application built with Expo and TypeScript for the Arcio MHC project.

## Features

- **Authentication System**: Complete signup, login, and email verification (OTP)
- **Dark Theme**: Beautiful dark blue gradient design with red accent buttons
- **World Management**: Host and browse gaming worlds with real-time status
- **Floating Overlay**: Toggleable semi-transparent overlay element
- **Drawer Navigation**: Slide-out sidebar with menu options
- **Form Validation**: Comprehensive input validation with error handling
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** (Stack & Drawer)
- **React Context** for state management
- **Expo Linear Gradient** for background effects
- **React Native Vector Icons** for icons
- **React Native Gesture Handler** for interactions
- **React Native Reanimated** for animations

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── GradientBackground.tsx
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   ├── WorldCard.tsx
│   │   └── FloatingOverlay.tsx
│   └── navigation/            # Navigation components
│       └── CustomDrawerContent.tsx
├── screens/                   # Screen components
│   ├── SignupScreen.tsx
│   ├── LoginScreen.tsx
│   ├── OTPVerificationScreen.tsx
│   └── MainScreen.tsx
├── context/                   # Context providers
│   ├── AuthContext.tsx
│   └── OverlayContext.tsx
├── navigation/                # Navigation configuration
│   └── AppNavigation.tsx
├── types/                     # TypeScript type definitions
│   └── index.ts
└── utils/                     # Utility functions
    ├── theme.ts
    └── validation.ts
```

## Screens

### 1. Signup Screen
- Arcio Username, Email, Password, Confirm Password fields
- Form validation with real-time error feedback
- Dark blue gradient background
- Red "Continue" button
- "Already have an account? Log In" link

### 2. Login Screen  
- Username/Email and Password fields
- Password visibility toggle (eye icon)
- Dark blue gradient background
- Red "Continue" button
- "Don't have an Account? Sign Up" link

### 3. Email Verification (OTP) Screen
- "EMAIL VERIFICATION" title
- Message explaining OTP sent to email
- 6-digit OTP input field
- Red "Continue" button
- "Go back" and "Resend OTP" links

### 4. Main Screen (Dashboard)
- Welcome message with username
- Large green "HOST WORLD" button
- Search bar with "Search worlds..." placeholder
- Red "Versions" filter button
- List of world cards showing:
  - Username (e.g., "liteamaze")
  - World name ("My World - v1.20.81.2")
  - Player count ("4/5")
  - Green online indicator dot
- Hamburger menu icon (opens drawer)

### 5. Sidebar Navigation
Accessible from hamburger menu with dark theme containing:
- Support us
- Contact us  
- Overlay (toggles floating overlay)
- Log Out

## Color Scheme

- **Background**: Dark blue gradient (`#1a237e` to `#0d47a1`)
- **Primary buttons**: Red/coral (`#f44336`)
- **Input fields**: Semi-transparent blue with rounded corners
- **Text**: White/light gray
- **Accent**: Green (`#4caf50`) for online indicators

## Form Validation

- **Username**: 3-20 characters, alphanumeric and underscores only
- **Email**: Valid email format validation
- **Password**: Minimum 8 characters with uppercase, lowercase, and number
- **OTP**: 6-digit numeric code
- **Confirm Password**: Must match password field

## State Management

The app uses React Context for state management:

- **AuthContext**: Manages user authentication state and operations
- **OverlayContext**: Controls floating overlay visibility and position

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on device/simulator**:
   ```bash
   npm run android  # for Android
   npm run ios      # for iOS
   npm run web      # for Web
   ```

## Development Features

- **Hot Reload**: Real-time code updates during development
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code linting for consistent style
- **Comments**: Comprehensive code documentation
- **Error Handling**: Proper error boundaries and user feedback

## Authentication Flow

1. User lands on Login screen
2. Can navigate to Signup for new account
3. After signup, redirected to OTP Verification
4. Upon successful verification, navigated to Main screen
5. Main screen provides access to world management and drawer menu

## Mock Data

The app includes mock data for development:
- Mock authentication (accepts any credentials)
- Mock OTP verification (accepts "123456")
- Mock world data for the dashboard

## Production Considerations

- Replace mock authentication with real API calls
- Implement proper error handling and logging
- Add analytics and crash reporting
- Configure app icons and splash screens
- Set up CI/CD pipeline for deployment
- Add unit and integration tests

## License

This project is private and proprietary to ARCIO-MHC.
