/**
 * Development Helper Script
 * Provides useful development commands and utilities
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, 'green');
  } catch (_error) {
    log(`❌ ${description} failed`, 'red');
    process.exit(1);
  }
}

function checkDependencies() {
  log('🔍 Checking dependencies...', 'cyan');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@react-navigation/native',
    '@react-navigation/stack',
    '@react-navigation/drawer',
    'expo-linear-gradient',
    'react-native-gesture-handler',
    'react-native-reanimated',
  ];
  
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  if (missingDeps.length > 0) {
    log(`❌ Missing dependencies: ${missingDeps.join(', ')}`, 'red');
    return false;
  }
  
  log('✅ All required dependencies are installed', 'green');
  return true;
}

function generateComponent(componentName) {
  if (!componentName) {
    log('❌ Please provide a component name', 'red');
    return;
  }
  
  const componentTemplate = `/**
 * ${componentName} Component
 * Generated component template
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../utils/theme';

interface ${componentName}Props {
  // Add your props here
}

export const ${componentName}: React.FC<${componentName}Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${componentName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
});
`;

  const filePath = path.join('src', 'components', 'ui', `${componentName}.tsx`);
  
  if (fs.existsSync(filePath)) {
    log(`❌ Component ${componentName} already exists`, 'red');
    return;
  }
  
  fs.writeFileSync(filePath, componentTemplate);
  log(`✅ Component ${componentName} created at ${filePath}`, 'green');
}

// Command line interface
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'check':
    checkDependencies();
    break;
    
  case 'lint':
    runCommand('npx expo lint', 'Running ESLint');
    break;
    
  case 'type-check':
    runCommand('npx tsc --noEmit', 'Type checking');
    break;
    
  case 'clean':
    runCommand('npx expo install --fix', 'Cleaning and fixing dependencies');
    break;
    
  case 'generate':
    generateComponent(args[0]);
    break;
    
  case 'dev':
    log('🚀 Starting development environment...', 'magenta');
    checkDependencies();
    runCommand('npm start', 'Starting Expo development server');
    break;
    
  default:
    log('📖 Available commands:', 'bright');
    log('  check      - Check if all required dependencies are installed', 'yellow');
    log('  lint       - Run ESLint', 'yellow');
    log('  type-check - Run TypeScript type checking', 'yellow');
    log('  clean      - Clean and fix dependencies', 'yellow');
    log('  generate   - Generate a new component template', 'yellow');
    log('  dev        - Start development environment', 'yellow');
    log('\n📝 Usage:', 'bright');
    log('  node scripts/dev-helper.js <command> [args]', 'cyan');
    log('  Example: node scripts/dev-helper.js generate MyComponent', 'cyan');
}
