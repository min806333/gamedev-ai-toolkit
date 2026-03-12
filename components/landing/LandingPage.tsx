import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { CTA } from "@/components/landing/CTA";
import { Examples } from "@/components/landing/Examples";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { ToolsGrid } from "@/components/landing/ToolsGrid";

export async function LandingPage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <Hero />
      <Features />
      <ToolsGrid />
      <Examples />
      <PricingPreview />
      <CTA />
      <Footer />
    </div>
  );
}
