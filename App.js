import { useState } from 'react';
import Navigation from './app/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './app/context/AuthContext';
import FlashMessage from "react-native-flash-message";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
      <FlashMessage position="top" autoHide/>
    </SafeAreaProvider>
  );
}