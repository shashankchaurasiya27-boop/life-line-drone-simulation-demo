import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AcademicIntegrationCodeEmotionAnalysis from './pages/academic-integration-code-emotion-analysis';
import PrivacyControlsDataManagement from './pages/privacy-controls-data-management';
import AIContentGenerationHub from './pages/ai-powered-content-generation-hub';
import BiometricAnalyticsHealthMonitoring from './pages/biometric-analytics-health-monitoring';
import RealTimeEmotionDashboard from './pages/real-time-emotion-dashboard';
import SocialMoodSynchronizationCampusInsights from './pages/social-mood-synchronization-campus-insights';
import CodeEditorPage from './pages/code-editor';
import AIPoweredStudyAssistant from './pages/ai-powered-study-assistant';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AcademicIntegrationCodeEmotionAnalysis />} />
        <Route path="/academic-integration-code-emotion-analysis" element={<AcademicIntegrationCodeEmotionAnalysis />} />
        <Route path="/privacy-controls-data-management" element={<PrivacyControlsDataManagement />} />
        <Route path="/ai-powered-content-generation-hub" element={<AIContentGenerationHub />} />
        <Route path="/biometric-analytics-health-monitoring" element={<BiometricAnalyticsHealthMonitoring />} />
        <Route path="/real-time-emotion-dashboard" element={<RealTimeEmotionDashboard />} />
        <Route path="/social-mood-synchronization-campus-insights" element={<SocialMoodSynchronizationCampusInsights />} />
        <Route path="/code-editor" element={<CodeEditorPage />} />
        <Route path="/ai-powered-study-assistant" element={<AIPoweredStudyAssistant />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
