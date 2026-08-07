import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VanReveal from "@/components/VanReveal";
import Solutions from "@/components/Solutions";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import FeatureStrip from "@/components/FeatureStrip";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VanReveal />
        <Solutions />
        <Stats />
        <Process />
        <Projects />
        <FeatureStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
