import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { AuthModalProvider } from '@/context/AuthModalContext'
import { InterviewSetupProvider } from '@/context/InterviewSetupContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { AuthModal } from '@/components/auth/AuthModal'
import { LandingPage } from '@/pages/LandingPage'
import { AuthRedirectPage } from '@/pages/AuthRedirectPage'
import { InterviewSetupPage } from '@/pages/InterviewSetupPage'
import { InterviewPage } from '@/pages/InterviewPage'
import { InterviewSessionPage } from '@/pages/InterviewSessionPage'
import { OAuthCallbackPage } from '@/pages/OAuthCallbackPage'
import { ProfilePage } from '@/pages/ProfilePage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AuthModalProvider>
            <InterviewSetupProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/signin"
                  element={<AuthRedirectPage mode="signin" />}
                />
                <Route
                  path="/signup"
                  element={<AuthRedirectPage mode="signup" />}
                />
                <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/interview/setup"
                  element={
                    <RequireAuth>
                      <InterviewSetupPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/interview"
                  element={
                    <RequireAuth>
                      <InterviewPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/interview/session"
                  element={
                    <RequireAuth>
                      <InterviewSessionPage />
                    </RequireAuth>
                  }
                />
              </Routes>
              <AuthModal />
            </InterviewSetupProvider>
          </AuthModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
