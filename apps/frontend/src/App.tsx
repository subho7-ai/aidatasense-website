import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { AiLandscapePage } from "./pages/AiLandscapePage";
import { ContactPage } from "./pages/ContactPage";
import { CoursesPage } from "./pages/CoursesPage";
import { EtlMigrationCaseStudyPage } from "./pages/EtlMigrationCaseStudyPage";
import { M4mDatabricksCaseStudyPage } from "./pages/M4mDatabricksCaseStudyPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlatformPage } from "./pages/PlatformPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RefundPolicyPage } from "./pages/RefundPolicyPage";
import { RetailCustomerAnalyticsCaseStudyPage } from "./pages/RetailCustomerAnalyticsCaseStudyPage";
import { SignupPage } from "./pages/SignupPage";
import { SnowflakeCaseStudyPage } from "./pages/SnowflakeCaseStudyPage";
import { TermsPage } from "./pages/TermsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="case-studies/snowflake-ingestion" element={<SnowflakeCaseStudyPage />} />
        <Route path="case-studies/legacy-etl-migration" element={<EtlMigrationCaseStudyPage />} />
        <Route path="case-studies/m4m-databricks-modernization" element={<M4mDatabricksCaseStudyPage />} />
        <Route path="case-studies/retail-customer-analytics" element={<RetailCustomerAnalyticsCaseStudyPage />} />
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="platforms/:slug" element={<PlatformPage />} />
          <Route path="ai-landscape" element={<AiLandscapePage />} />
          {/* Old address, kept so existing links still work */}
          <Route path="ai-progress" element={<Navigate to="/ai-landscape" replace />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
