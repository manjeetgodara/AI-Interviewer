import { Navbar, Footer } from '@/components/layout'
import {
  Hero,
  DashboardMockup,
  CoreBenefits,
  FinalCTA,
} from '@/components/landing'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8f9fd_45%,#ffffff_100%)]">
      <Navbar />
      <main>
        <Hero />
        <DashboardMockup />
        <CoreBenefits />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
