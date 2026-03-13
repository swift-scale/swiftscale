import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CorePillars } from "@/components/sections/CorePillars";
import { AllServices } from "@/components/sections/AllServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { Academy } from "@/components/sections/Academy";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CorePillars />
        <AllServices />
        <WhyChooseUs />
        <Process />
        <Academy />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
