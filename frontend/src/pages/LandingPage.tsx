import { Navbar, Footer } from '@/components/layout'
import {
  Hero,
  DashboardMockup,
  CoreBenefits,
  FinalCTA,
} from '@/components/landing'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
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
