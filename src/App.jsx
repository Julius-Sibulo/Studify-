import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import StudyToolsScreen from './pages/StudyToolsScreen';
import AnalyticsScreen from './pages/AnalyticsScreen';
import StudyPlannerScreen from './pages/StudyPlannerScreen';
import ProfileScreen from './pages/ProfileScreen';
import CalendarScreen from './pages/CalendarScreen';
import StudyTimerScreen from './pages/StudyTimerScreen';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/tools" element={<StudyToolsScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="/planner" element={<StudyPlannerScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/timer" element={<StudyTimerScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}