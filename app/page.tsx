import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { HomePageContent } from "@/components/home-page-content";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <HomePageContent />
      <Footer />
    </div>
  );
}
