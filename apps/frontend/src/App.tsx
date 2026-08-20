import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { AiProgressPage } from "./pages/AiProgressPage";
import { ContactPage } from "./pages/ContactPage";
import { CoursesPage } from "./pages/CoursesPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlatformPage } from "./pages/PlatformPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RefundPolicyPage } from "./pages/RefundPolicyPage";
import { SignupPage } from "./pages/SignupPage";
import { TermsPage } from "./pages/TermsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="platforms/:slug" element={<PlatformPage />} />
          <Route path="ai-progress" element={<AiProgressPage />} />
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
