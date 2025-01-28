import HeroSection from "../components/hero-section";
import HowItWorksSection from "../components/how-it-works-section";
import FeaturesSection from "../components/features-section";
import TestimonialsSection from "../components/testimonials-section (1)";
import DemoSection from "../components/demo-section";
import TrustIndicatorsSection from "../components/trust-indicators-section";
import CtaSection from "../components/cta-section";
import FaqSection from "../components/faq-section";
import ContactSection from "../components/contact-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <DemoSection />
      <TrustIndicatorsSection />
      <CtaSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}

