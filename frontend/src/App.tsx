import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { InterviewSetupProvider } from '@/context/InterviewSetupContext'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { LandingPage } from '@/pages/LandingPage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { InterviewSetupPage } from '@/pages/InterviewSetupPage'
import { InterviewPage } from '@/pages/InterviewPage'
import { InterviewSessionPage } from '@/pages/InterviewSessionPage'
import { OAuthCallbackPage } from '@/pages/OAuthCallbackPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewSetupProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
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
        </InterviewSetupProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
